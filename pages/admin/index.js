import { Component, Fragment } from 'react';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core';
import { Dehaze, Settings, Clear, Search, DoneAll } from '@material-ui/icons';
import qs from 'qs';
import { get as _get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import loading from '../../services/decorators/loading';
import { organization } from '../../services/cruds';
import { setData } from '../../actions/updateData';
import Table from '../../components/customTableAdminNewUser';
import Layout from '../../components/MyLayout';
import SecondPanel from '../../components/secondpanel';
import ClassesNesting from '../../components/features/withClassesNesting';

import './admin.sass';

const ButtonInfo = {
  Approve: {
    name: 'Approve',
    className: 'approve-button',
    onClick: () => {
      console.log('Approve');
    }
  },
  Reject: {
    name: 'Reject',
    className: 'reject-button',
    onClick: () => {
      console.log('Reject');
    }
  },
  Verticals: {
    name: '',
    className: 'vertical-button',
    onClick: () => {
      console.log('VerticalButtons');
    }
  }
};

const CustomButton = ({ IconComponent }) => {
  let data;
  IconComponent === DoneAll
    ? (data = ButtonInfo.Approve)
    : IconComponent === Clear
    ? (data = ButtonInfo.Reject)
    : (data = ButtonInfo.Verticals);
  const { name, className, onClick } = data;
  return (
    <Button className={className} onClick={onClick}>
      {name}
      <IconComponent />
    </Button>
  );
};

const withIcon = IconComponents =>
  class Icon extends Component {
    render() {
      return (
        <>
          {IconComponents.map((IconComponent, id) => (
            <CustomButton key={id} IconComponent={IconComponent} />
          ))}
        </>
      );
    }
  };

const ButtonWithIconVB = withIcon([Dehaze, Settings]);
const ButtonWithIconHB = withIcon([DoneAll, Clear]);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  organizationMembers: runtime.organizationMembers,
  joinRequests: runtime.joinRequests
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@loading()
export class AdminPanel extends Component {
  state = {
    query: '',
    selected: 0
    // isAdmin: false,
  };

  componentDidMount() {
    this.GetJoinRequests_loadAndSaveToProps();
  }

  handleSubmit = e => {
    if (e.charCode === 13) {
      this.GetOrganizationMembers_loadAndSaveToProps();
      this.GetJoinRequests_loadAndSaveToProps();
      // this.GetUserActivityChart_loadAndSaveToProps();
      // const condition = e.target.value;
      // console.log('condition');
      // this.GetUserActivityChart_loadAndSaveToProps(condition);
    }
  };

  handleSearchStart = () => {
    this.GetOrganizationMembers_loadAndSaveToProps();
    this.GetJoinRequests_loadAndSaveToProps();
  };

  handleBlur = () => {
    document.removeEventListener('keypress', this.handleSubmit);
  };

  handleFocus = () => {
    document.addEventListener('keypress', this.handleSubmit);
  };

  handleClear = async e => {
    /* await this.setState({
      query: '',
      choosenGroup: '...'
    });
    this.GetUserActivityChart_loadAndSaveToProps(); */
  };

  handleCustomChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  GetOrganizationMembers_loadAndSaveToProps = async () => {
    const { query } = this.state;
    let params = {};
    query
      ? (params = {
          query: query,
          limit: 99,
          offset: 0
        })
      : (params = {
          limit: 99,
          offset: 0
        });
    const resp = await this.props.loadData(
      organization.get(params, '/GetOrganizationMembers', false, par =>
        qs.stringify(par, { indices: false })
      ),
      {
        saveTo: 'organizationMembers'
      }
    );
    this.props.setData(resp.data, 'organizationMembers');
  };

  GetJoinRequests_loadAndSaveToProps = async () => {
    const { query } = this.state;
    let params = {};
    query
      ? (params = {
          query: query,
          limit: 99,
          offset: 0
        })
      : (params = {
          limit: 99,
          offset: 0
        });
    const resp = await this.props.loadData(
      organization.get(params, '/GetJoinRequests', false, par =>
        qs.stringify(par, { indices: false })
      ),
      {
        saveTo: 'joinRequests'
      }
    );
    this.props.setData(resp.data, 'joinRequests');
  };

  handleNumSelected = (selectInfo, selected) => {
    console.log('selectInfo', selectInfo);
    this.setState({ selectInfo, selected });
  };

  render() {
    // console.log('this.props', this.props);
    // console.log('this.state', this.state);
    const { joinRequests } = this.props;
    const { query, selected, selectInfo } = this.state;
    const countSelectedItem = _get(selected, 'length');
    const countSelectedInfo = _get(selectInfo, 'length');
    return (
      <Fragment>
        <Layout>
          <div className="admin-panel-wrapper">
            <Grid container spacing={0} justify="center">
              <Grid item xs={12} sm={12}>
                <Grid
                  container
                  spacing={0}
                  justify="space-between"
                  className="container">
                  <Grid item xs={1} sm={1} className="container-grid">
                    <div className="vertical-block">
                      <ButtonWithIconVB />
                    </div>
                  </Grid>
                  <Grid item xs={11} sm={11} className="container-grid">
                    <div className="horizontal-block">
                      <p className="text-title">MetKnow Admin Dashboard</p>
                      <TextField
                        InputProps={{
                          className: 'field-search-input',
                          onBlur: this.handleBlur,
                          onFocus: this.handleFocus,
                          startAdornment: (
                            <InputAdornment variant="filled" position="start">
                              <Search
                                className="endAdornment-search-start"
                                onClick={this.handleSearchStart}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment variant="filled" position="end">
                              <Clear
                                className="endAdornment-search-clear"
                                onClick={this.handleClear}
                              />
                            </InputAdornment>
                          )
                        }}
                        id="outlined-search"
                        className="field-search"
                        placeholder="Quick Search"
                        value={this.state.query}
                        type="text"
                        onChange={this.handleCustomChange}
                        // onChange={this.handleChange('query')}
                        margin="normal"
                        variant="filled"
                      />
                    </div>
                    <div className="horizontal-block-info">
                      <p className="text-title-info">New Users</p>
                      <div className="horizontal-block-info-button">
                        {!!countSelectedItem && !!countSelectedInfo && (
                          <>
                            <p className="text-title-info-count">
                              {countSelectedInfo} items Selected
                            </p>
                            <ButtonWithIconHB />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="horizontal-block-table-new-user">
                      <Table
                        {...joinRequests}
                        handleNumSelected={this.handleNumSelected}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Layout>
      </Fragment>
    );
  }
}

export default AdminPanel;
