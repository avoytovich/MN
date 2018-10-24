import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Button, Grid } from '@material-ui/core';
import Layout from '../../../components/MyLayout.js';
import SecondPanel from '../../../components/secondpanel';
import SearchPanel from '../../../components/searchpanel';
import Groups from '../../../components/groups';
import Footer from '../../../components/footer';
import CreateGroupBtn from '../../../components/secondpanel/creategroupbtn';

@withRouter
export default class About extends Component {
  render() {
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Manage Groups"
              breadCrumb="Home / Manage Groups"
              actionButtons={[<CreateGroupBtn key={'one'} />]}
            />
            <SearchPanel />
            <Groups />
            <Footer />
          </Layout>
        </Grid>
        <Grid container spacing={0} justify="center" />
        <Grid item xs={12} sm={10} md={9} lg={8} xl={6} />
      </Grid>
    );
  }
}
