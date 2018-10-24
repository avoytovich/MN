import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import Layout from '../../components/MyLayout';
import Footer from '../../components/footer';
import SecondPanel from '../../components/secondpanel';
import BackToGroupBtn from '../../components/creategroups/backtogroupbtn';
import SearchPanel from '../../components/searchpanel';
import ActivityChart from '../../components/activitychart';

@withRouter
export default class UserActivityChart extends Component {
  render() {
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="User activity chart"
              breadCrumb="Home / User activity chart"
              actionButtons={[<BackToGroupBtn label="Back" key={'one'} />]}
            />
            <SearchPanel />
            <ActivityChart />
            <Footer />
          </Layout>
        </Grid>
        <Grid container spacing={0} justify="center" />
        <Grid item xs={12} sm={10} md={9} lg={8} xl={6} />
      </Grid>
    );
  }
}
