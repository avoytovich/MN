import { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import { withRouter } from 'next/router';
import Layout from '../../components/MyLayout';
import Footer from '../../components/footer';
import EditGroup from 'components/editgroup';
import { connect } from 'react-redux'
import find from 'lodash/find';

@withRouter
export default class EditGroupPage extends Component{
  render() {
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <EditGroup />
            <Footer />
          </Layout>
        </Grid>
        <Grid container spacing={0} justify="center" />
        <Grid item xs={12} sm={10} md={9} lg={8} xl={6} />
      </Grid>
    );
  }
}
