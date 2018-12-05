import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Button, Grid } from '@material-ui/core';
import Layout from 'components/MyLayout.js';
import SecondPanel from 'components/secondpanel';
import SearchPanel from 'components/searchpanel';
import Groups from 'components/groups';
import Footer from 'components/footer';
import CreateGroupBtn from 'components/secondpanel/creategroupbtn';
import ActivityChartButton from 'components/activitychart/button';
import { myRoleIs } from "../../services/accountService";

@withRouter
export default class About extends Component {
  state = {
    isAdmin: false,
  }

  componentDidMount() {
    this.setState({
      isAdmin: myRoleIs(),
    })
  }

  render() {
    const { isAdmin } = this.state;
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Manage Groups"
              breadCrumb=""
              actionButtons={[
                <ActivityChartButton />,
                isAdmin && <CreateGroupBtn />
              ]}
            />
            <SearchPanel />
            <Groups />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
