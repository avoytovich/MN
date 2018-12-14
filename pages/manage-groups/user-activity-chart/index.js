import { Component, Fragment } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import ArrowBack from "@material-ui/icons/ArrowBack";
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from "qs";

import Layout from '../../../components/MyLayout';
import SecondPanel from '../../../components/secondpanel';
import ClassesNesting from '../../../components/features/withClassesNesting';
import loading from '../../../services/decorators/loading';
import {organization} from '../../../services/cruds';
import { setData } from '../../../actions/updateData';
import Table from '../../../components/customTable';

import './user-activity-chart.sass';
/*import { withRouter } from 'next/router';
import { Link } from '../../../routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get as _get } from 'lodash';
import qs from 'qs';
import { Button } from '@material-ui/core';


import SecondPanel from 'components/secondpanel';
import Features from 'components/features';
import { group } from 'services/cruds';
import loading from 'services/decorators/loading';
import { setData } from 'actions/updateData';
import { getSingle } from 'actions/groups';
import { myRoleIs } from "../../../services/accountService";

//import './group.sass';*/

/*const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData, getSingle }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  groupDetails: runtime.groupDetails,
});

@withRouter*/

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  userActivityChart: runtime.userActivityChart,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@loading()
export class UserActivityChart extends Component {
  state = {
    category: 'ALL',
    query: null,
    choosenGroup: '...',
    //isAdmin: false,
  }

  handleCategory = (category) => (this.setState({category}));

  handleChoosenGroup = (choosenGroup) => (this.setState({choosenGroup}))

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    if(e.charCode === 13) {
      this.setState({
        query: e.target.value,
        choosenGroup: '...'
      });
      //const condition = e.target.value;
      //console.log('condition', condition);
      //this.GetUserActivityChart_loadAndSaveToProps(condition);
    }
  };

  handleBack = () => (Router.back());

  handleBlur = () => {
    document.removeEventListener('keypress', this.handleSubmit);
  };

  handleFocus = () => {
    document.addEventListener('keypress', this.handleSubmit);
  };

  GetUserActivityChart_loadAndSaveToProps = async () => {
    const { category, query } = this.state;
    //const setQuery = ['ALL', 'GROUP'].some(item => (item == category));
    let params = {};
    query ? params = {
      searchIn: category.toLowerCase(),//setQuery ? 1 : 0,
      query: query,
      limit: 99,
      offset: 0,
    } : params = {
      searchIn: category.toLowerCase(),//setQuery ? 1 : 0,
      limit: 99,
      offset: 0,
    };
    const resp = await this.props.loadData(
      organization.get(
        params,
        '/UserActivityChart',
        false,
        par => qs.stringify(par, { indices: false })
      ),
      {
        saveTo: 'userActivityChart'
      }
    );
    this.props.setData(resp.data, 'userActivityChart');
  };

  handleGetGroup = () => {
    const { data } = this.props.userActivityChart;
    let array =[];
    data.forEach((data, id) => {
      if (!array.some(item => (item == data.group))) {
        return array.push(data.group);
      }
    });
    return array;
  }

  componentDidUpdate(prevProps, prevState) {
    const { category, query } = this.state;
    if (prevState.category != category ||
      prevState.query != query) {
      return this.GetUserActivityChart_loadAndSaveToProps();
    }
  }

  componentDidMount() {
    this.GetUserActivityChart_loadAndSaveToProps();
  }

  render() {
    //console.log('this.props', this.props);
    //console.log('this.state', this.state);
    const { userActivityChart } = this.props;
    const { category, choosenGroup } = this.state;
    /*const { pathname } = this.props.router;
    const { groupDetails } = this.props;
    const { isAdmin } = this.state;
    if (!groupDetails) return null;
    const data = _get(groupDetails, 'data');
    const quizAvailable = !!data.images.length;*/
    return (
      <Fragment>
        <Layout>
          <div className="user-activity-chart-wrapper">
            <SecondPanel
              actionButtons={[
                <Button
                  variant="outlined"
                  color="primary"
                  className="title-button"
                  onClick={this.handleBack}
                >
                    <ArrowBack/>
                    BACK
                </Button>
              ]}
              breadCrumb={`Manage Groups / User Activity Chart`}
              title="User Activity Chart"
            />
            <Grid container spacing={0} justify="center">
              <Grid item xs={10} sm={10}>
                <Grid container spacing={0} justify="space-between" className='container'>
                  <Grid item xs={3} sm={3} className='container-grid'>
                    <TextField
                      label="Choose View"
                      id="outlined-select"
                      InputProps={{
                        className: "field-search-input",
                        onChange: (e) => this.handleCategory(e.target.value),
                      }}
                      select
                      className='field-select'
                      value={this.state.category}
                      onChange={this.handleChange('category')}
                      margin="normal"
                      variant="outlined"
                    >
                      {['ALL', 'GROUPS', 'SUBGROUPS'].map((item, id) => (
                        <ClassesNesting key={id} value={item}>
                          {item}
                        </ClassesNesting>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={3} sm={3} className='container-grid'>
                    <TextField
                      InputProps={{
                        className: "field-search-input",
                        onBlur: this.handleBlur,
                        onFocus: this.handleFocus,
                      }}
                      id="outlined-search"
                      className='field-search'
                      placeholder='Search by Name'
                      type="search"
                      /*onChange={(e) => this.handleChange(e)}*/
                      margin="normal"
                      variant="filled"
                    />
                  </Grid>
                  {category == 'GROUPS' && (
                    <Grid item xs={3} sm={3} className='container-grid'>
                      <TextField
                        label="Choose Group"
                        id="outlined-select"
                        InputProps={{
                          className: "field-search-input",
                          onChange: (e) => this.handleChoosenGroup(e.target.value),
                        }}
                        select
                        className='field-select'
                        value={this.state.choosenGroup}
                        onChange={this.handleChange('choosenGroup')}
                        margin="normal"
                        variant="outlined"
                      >
                        {this.handleGetGroup().map((item, id) => (
                          <ClassesNesting key={id} value={item}>
                            {item}
                          </ClassesNesting>
                        ))}
                      </TextField>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={12}>
                    {userActivityChart &&
                      <Table
                        {...userActivityChart}
                        choosenGroup={choosenGroup}
                        category={category}
                      />
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Layout>
      </Fragment>
      /*<Fragment>
        <Layout>
          <div className="underheader-wrapper">
            <SecondPanel
              actionButtons={[
                <Button variant="outlined" color="secondary"> INVITE
                </Button>
              ]}
              actionButtons={[
                !isAdmin && quizAvailable === true ? (
                  <Link
                    key="link-quiz"
                    route="quiz"
                    params={{
                      id: data.id
                    }}>
                    <a>
                      <Button
                        variant="contained"
                        color="primary"
                        className="custom-button-material">
                        Quiz
                      </Button>
                    </a>
                  </Link>
                ) : (
                  undefined
                )
              ]}
              breadCrumb={`Manage Groups / ${data.name}`}
              title="Group Content"
            />
          </div>
          <Features groupDetails={data} />
        </Layout>
      </Fragment>*/
    );
  }
}

export default UserActivityChart;
