import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Grid, Button } from '@material-ui/core';
import Layout from '../../components/MyLayout';
import Footer from '../../components/footer';
import Header from '../../components/header/header';
import CreateGroup from '../../components/creategroups';
import SecondPanel from '../../components/secondpanel';
import BacktoGroupBtn from '../../components/creategroups/backtogroupbtn';
import Main from '../../components/creategroups/main/index.jsx';

@withRouter
export default class CreateGroupPage extends Component {
  render() {
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Create a Group"
              breadCrumb="Home / Create a Group"
              actionButtons={[
                <Button variant="outlined" color="secondary">Cancel</Button>,
                <Button variant="contained" color="primary">Save</Button>
              ]}
            />
            <Main />
            <Footer />
          </Layout>
        </Grid>
        <Grid container spacing={0} justify="center" />
        <Grid item xs={12} sm={10} md={9} lg={8} xl={6} />
      </Grid>
    );
  }
}
