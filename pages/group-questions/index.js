import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import Layout from 'components/MyLayout.js';
import SecondPanel from 'components/secondpanel';
import { getAllQuestions } from 'actions/questions'
import GroupQuestions from 'components/groupQuestions'

@withRouter
export default class Profile extends Component {
  render() {
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Questions"
              breadCrumb={`Manage Groups / Questions`}
            />
            <GroupQuestions />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
