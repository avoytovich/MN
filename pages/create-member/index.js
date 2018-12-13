import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import Layout from 'components/MyLayout.js';
import SecondPanel from 'components/secondpanel';
import { createMember } from 'actions/member'
import EditProfile from 'components/profile/profile'
import Router from 'next/router';
import 'components/profile/style.sass'
import { memberInfoSchema } from '../../services/validateSchemas';


const inputNames = [
  { name:"firstName", label:"First Name"},
  { name:"city", label:"City"},
  { name:"title", label:"Position"},
  { name:"lastName", label:"Last Name"},
  { name:"email", label:"Email" },
  { name:"phone", label:"Phone Number" },
  { name:"company", label:"Department" },
  { name:"public", label:"About Me" }
]

@withRouter
export default class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName : "",
      lastName : "",
      email : "",
      phone : "",
      gender : "Male",
      city : "",
      title : "",
      company : "",
      whereWeMet : "",
      myNotes: "",
      public : "",
      imageContent: null,
      imageContentId: 0
    }
  }

  sumbmitRequest = async (values) => {
    const { groupId } = this.props.router.query
    const data = await createMember({values, groupId})
    return data
  }

  handleSuccessRequest = values => {
    Router.back()
  }

  render() {
    const name = this.state ? this.state.firstName : ''
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Member"
              breadCrumb={`Manage Groups / Group / Member`}
            />
            <EditProfile
              user={this.state}
              sumbmitRequest={this.sumbmitRequest}
              handleSuccessRequest={this.handleSuccessRequest}
              inputNames={inputNames}
              schema={memberInfoSchema}
            />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
