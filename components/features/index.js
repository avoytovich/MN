import { Component, Fragment } from 'react';
import { Grid, IconButton, TextField, FormControl, MenuItem } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { withRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import qs from "qs";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as _get } from 'lodash';

import { setData } from '../../actions/updateData';
import { members } from '../../services/cruds';
import loading from '../../services/decorators/loading';

import "./features.sass";

const orderBy = [
  {
    value: 'Sort By:',
    label: 'Sort By:'
  },
  {
    value: 'firstname',
    label: 'firstname',
  },
  {
    value: 'lastname',
    label: 'lastname',
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
      orderBy: 'Sort By:',
    }
  }

  componentWillMount() {
    this.loadAndSaveMembersList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.membersInfo === {}) {
      this.loadAndSaveMembersList();
    }
  }

  loadAndSaveMembersList = async condition => {
    if (condition && condition !== '') {
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
    const { offset, search } = this.state;
    const resp = await this.props.loadData(
      members.get(
        {
          groupId: groupDetails.id,
          limit: 12,
          offset: offset,
          search: search
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
    if (!groupMembers) return null;
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
                      <CreateIcon />
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
                    }}
                    select
                    className='field-select'
                    value={this.state.orderBy}
                    onChange={this.handleChange('orderBy')}
                    placeholder='Sort By:'
                    /*SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}*/
                    margin="normal"
                    variant="outlined"
                  >
                    {orderBy.map(option => (
                      <MenuItem key={option.value} value={option.value} disabled={(option.value == 'Sort By:')}>
                        {option.label}
                      </MenuItem>
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
                    InputProps={{
                      className: "field-search-input"
                    }}
                    id="outlined-number"
                    className='field-sort'
                    placeholder='Choose View:'
                    value='STATE'
                    /*onChange={this.handleChange('age')}*/
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} sm={6} className="user-activity-right">
                  <div className="user-activity-chat">
                    <img src='/static/svg/user-activity-chart.svg'/>
                    <p className="user-activity-chat-signature">USER ACTIVITY CHAT</p>
                  </div>
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
                      <div
                        //ref={this.member}
                        //onClick={() => this.handleClick(slug)}
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
                    </div>
                  </Grid>
                  {elements.map((item, index) => {
                    const {
                      firstName,
                      lastName,
                      title,
                      imageContent,
                    } = item;
                    return (
                      <Grid key={index} item xs={6} sm={3}>
                        <div className="grid-info">
                          <div
                            //ref={this.member}
                            //onClick={() => this.handleClick(slug)}
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
                          {/*<div className="info">
                            <Typography
                              variant="button"
                              fontSize="16px"
                              className="info-name">
                              {username}
                            </Typography>
                            <div className="info-rate-left">
                              <Rate
                                className="flex-with-margin"
                                initialRating={rating}
                                readonly
                              />
                              <div className="info-rate-right">
                                <Typography
                                  variant="subheading"
                                  fontSize="14px"
                                  className="info-rate-current">
                                  {currency &&
                                  calculateDisplayedRate(
                                    parseFloat(
                                      currentRate / 100,
                                    ).toFixed(2),
                                    this.state.commission,
                                  )}
                                  {currency &&
                                  ` ${get(
                                    currency,
                                    'name',
                                  )}`}/{this.props.translate('hour')}
                                </Typography>
                              </div>
                              <div className="info-rate-left">
                                <Typography
                                  variant="subheading"
                                  fontSize="14px"
                                  className="info-slogan">
                                  {slogan}
                                </Typography>
                              </div>
                            </div>
                          </div>*/}
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