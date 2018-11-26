import { Component, Fragment } from 'react';
import { Grid, IconButton, TextField, FormControl, MenuItem } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { withRouter } from 'next/router';
import { Link } from '../../routes';
import InfiniteScroll from 'react-infinite-scroll-component';
import qs from "qs";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as _get } from 'lodash';

import { setData } from '../../actions/updateData';
import { members } from '../../services/cruds';
import loading from '../../services/decorators/loading';
import ClassesNesting from './withClassesNesting';

import "./features.sass";

const orderBy = [
  {
    value: 'firstname',
    label: 'First Name',
  },
  {
    value: 'lastname',
    label: 'Last Name',
  },
];

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  groupMembers: runtime.groupMembers
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withRouter
@loading()
export class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      elements: [],
      search: null,
      membersInfo: {
        pagination: {
          total_count: 0
        }
      },
      orderBy: 'firstname',
      group: 'ROOT'
    }
  }

  componentWillMount() {
    this.loadAndSaveMembersList();
  }

  componentDidUpdate() {
    const { subgroups, id } = this.props.groupDetails;
    if (!subgroups.some(item => (item.name == 'ROOT'))) {
      subgroups.unshift({name: 'ROOT', id: id})
    }
  }

  componentDidMount() {
    const { subgroups, id } = this.props.groupDetails;
    if (!subgroups.some(item => (item.name == 'ROOT'))) {
      subgroups.unshift({name: 'ROOT', id: id})
    }
  }

  loadAndSaveMembersList = async condition => {
    if (this.props.groupDetails.subgroups.some(item => {
      return item.name == condition;
    }) ) {
      await this.setState({
        offset: 0,
        elements: [],
        group: condition,
      });
    }
    if (condition == 'firstname' || condition ==  'lastname') {
      await this.setState({
        offset: 0,
        elements: [],
        orderBy: condition,
      });
    }
    if (condition &&
          ['', 'firstname', 'lastname', this.state.group].every(item => (condition != item))) {
      this.setState({
        offset: 0,
        elements: [],
        search: condition
      });
    }
    if (condition == '') {
      this.setState({
        offset: 0,
        elements: [],
        search: null
      });
    }
    const { groupDetails, groupMembers } = this.props;
    const { offset, search, orderBy, group } = this.state;
    const currentSubGroup = groupDetails.subgroups.filter(item => {
      return item.name == group;
    });
    const resp = await this.props.loadData(
      members.get(
        {
          groupId: currentSubGroup[0] && currentSubGroup[0]['id'] || groupDetails.id,
          limit: 12,
          offset: offset,
          search: search,
          orderBy: orderBy,
        },
        '/GetGroupMembers',
        false,
        par => qs.stringify(par, { indices: false }),
      ),
      {
        saveTo: 'groupMembers',
      },
    );
    this.setState({
      offset: this.state.offset + 12,
      elements: this.state.elements.concat(resp.data.data),
      membersInfo: {...resp.data},
    });
    this.props.setData(resp.data, 'groupMembers');
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    if(e.charCode === 13) {
      const condition = e.target.value;
      this.loadAndSaveMembersList(condition);
    }
  };

  handleBlur = () => {
    document.removeEventListener('keypress', this.handleSubmit);
  };

  handleFocus = () => {
    document.addEventListener('keypress', this.handleSubmit);
  };

  render() {
    //console.log('this.state', this.state);
    //console.log('this.props', this.props);
    const { groupDetails, groupMembers } = this.props;
    const { elements, membersInfo } = this.state;
    return (
      <Fragment>
        <div className="features-wrapper">
          <Grid container spacing={0} justify="center">
            <Grid item xs={8} sm={8}>
              <Grid container spacing={0} justify="center" className='container'>
                <Grid item xs={2} sm={2}>
                  <div
                    style={{
                      backgroundImage: `url('/static/svg/group-features.svg')`,
                    }}
                    className="icon"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div className='group'>
                    <p className='name'>{groupDetails.name}</p>
                      <IconButton
                        /*onClick={this.handleClick}*/
                      >
                        <Link route="editgroup" params={{id: groupDetails.id}}>
                          <CreateIcon />
                        </Link>
                      </IconButton><br/>
                    <p className='description'>{groupDetails.description}</p>
                  </div>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <FormControl>
                    <TextField
                      InputProps={{
                        className: "field-search-input",
                        onBlur: this.handleBlur,
                        onFocus: this.handleFocus,
                      }}
                      id="outlined-search"
                      className='field-search'
                      placeholder='Search in Group'
                      type="search"
                      /*onChange={(e) => this.handleChange(e)}*/
                      margin="normal"
                      variant="filled"
                    />
                  </FormControl>
                  <TextField
                    id="outlined-select"
                    InputProps={{
                      className: "field-search-input",
                      onChange: (e) => this.loadAndSaveMembersList(e.target.value)
                    }}
                    select
                    className='field-select'
                    value={this.state.orderBy}
                    onChange={this.handleChange('orderBy')}
                    margin="normal"
                    variant="outlined"
                  >
                    {orderBy.map(option => (
                      <ClassesNesting key={option.value} value={option.value}>
                        {`Sort By: ${option.label}`}
                      </ClassesNesting>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="features-wrapper-addition">
          <Grid container spacing={0} justify="center">
            <Grid item xs={8} sm={8}>
              <Grid container spacing={0} justify="center" className='container'>
                <Grid item xs={6} sm={6} className="user-activity-left">
                  <TextField
                    id="outlined-select"
                    InputProps={{
                      className: "field-search-input",
                      onChange: (e) => this.loadAndSaveMembersList(e.target.value),
                    }}
                    select
                    className='field-select'
                    value={this.state.group}
                    onChange={this.handleChange('group')}
                    margin="normal"
                    variant="outlined"
                  >
                    {groupDetails.subgroups.map((item, id) => (
                      <ClassesNesting key={id} value={item.name}>
                        {`Choose View: Group ${item.name}`}
                      </ClassesNesting>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6} className="user-activity-right">
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="features-wrapper-members">
          <Grid container spacing={0} justify="center">
            <Grid item xs={10} sm={10}>
              <InfiniteScroll
                next={() => this.loadAndSaveMembersList()}
                dataLength={this.state.elements.length}
                hasMore={
                  elements.length <
                  membersInfo.pagination.total_count
                }
                className="infinite-scroll-component">
                <Grid
                  container
                  spacing={16}
                  direction="row"
                  justify="flex-start"
                  className="infinite-scroll-component-list">
                  <Grid item xs={6} sm={3}>
                    <div className="grid-info">
                      <Link href={{ pathname: '/edit-member', query: { groupId: groupDetails.id } }}>
                        <div
                          style={{
                            backgroundImage: `url(${'/static/svg/placeholder_add.svg'})`,
                          }}
                          className="grid-info-list"
                        >
                          <div className="grid-info-list-info">
                            <p className="info-member-name">+ Add Profile</p>
                            <p className="info-member-title">Press here</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </Grid>
                  {elements.map((item, index) => {
                    const {
                      firstName,
                      lastName,
                      title,
                      imageContent,
                      id
                    } = item;
                    return (
                      <Grid key={index} item xs={6} sm={3}>
                        <div className="grid-info">
                          <Link href={{ pathname: '/edit-member', query: { memberId: id } }}>
                            <div
                              style={{
                                backgroundImage: `url(${_get(imageContent, 'mediumImage') ||
                                '/static/svg/placeholder.svg'})`,
                              }}
                              className="grid-info-list"
                            >
                              <div className="grid-info-list-info">
                                <p className="info-member-name">{`${firstName} ${lastName}`}</p>
                                <p className="info-member-title">{title}</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </InfiniteScroll>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Features;