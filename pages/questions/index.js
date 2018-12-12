import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Layout from 'components/MyLayout.js';
import SecondPanel from 'components/secondpanel';
import { getAllQuestions } from 'actions/questions';
import Questions from 'components/questions';
import { toggleSnackbar } from 'actions/snackbar';
import { connect } from 'react-redux';

import 'components/profile/style.sass';

@connect(
  null,
  { toggleSnackbar }
)
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    try {
      const data = await getAllQuestions();
      this.setState({ data });
    } catch (e) {
      const { message } = e.response.data.errors[0];
      this.props.toggleSnackbar(message, 'error');
    }
  }

  render() {
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Questions"
              breadCrumb="Manage Groups / Questions"
            />
            <Questions groups={this.state.data} />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
