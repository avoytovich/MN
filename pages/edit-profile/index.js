import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import Layout from 'components/MyLayout.js';
import SecondPanel from 'components/secondpanel';
import EditProfile from 'components/profile/profile'
import { editProfile } from 'actions/profile'
import { profileInfoSchema } from 'services/validateSchemas'

import Router from 'next/router';

import 'components/profile/style.sass'

const inputNames = [
  { name:"firstName", label:"First Name"},
  { name:"city", label:"City"},
  { name:"title", label:"Position"},
  { name:"lastName", label:"Last Name"},
  { name:"email", label:"Email" },
  { name:"phoneNumber", label:"Phone Number" },
  { name:"organization", label:"Department" },
  { name:"aboutMe", label:"About Me" }
]

@withRouter
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "Male",
      city: "",
      organization: "",
      title: "",
      aboutMe: "",
      imageContent: null,
      imageContentId: 0
    }
  }

  async componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'))
    const { profile } = user
    this.setState({...profile})
  }

  handleSuccessRequest = values => {
    //TODO: Add handling first using app
    Router.back()
  }


  render() {
    const name = this.state.firstName ? this.state.firstName: ''
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Profile"
              breadCrumb={`Manage Groups / ${name} Profile`}
            />
            <EditProfile
              user={this.state}
              sumbmitRequest={editProfile}
              handleSuccessRequest={this.handleSuccessRequest}
              inputNames={inputNames}
              schema={profileInfoSchema}
            />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
