import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Button, Grid } from '@material-ui/core';
import Layout from 'components/MyLayout.js';
import SecondPanel from 'components/secondpanel';
import { getMember, editMember } from 'actions/member'
import Router from 'next/router';
import EditProfile from 'components/profile/profile'
import { memberInfoSchema } from '../../services/validateSchemas';

import 'components/profile/style.sass'

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
  state = {
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

  async componentDidMount(){
    const { memberId } = this.props.router.query
    const data = await getMember(memberId)
    if(data.imageContent)
      data.imageContentId = data.imageContent.id
    this.setState({ ...data })
  }

  sumbmitRequest = async (values) => {
    const { memberId } = this.props.router.query
    values.id = memberId
    const data = await editMember(values)
    return data
  }

  handleSuccessRequest = values => {
    Router.back()
  }

  render() {
    const { router } = this.props;
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Member"
              breadCrumb={router.asPath.indexOf('?') != -1 ?
                'Manage Groups / Member' : 'Manage Groups / Group / Member'}
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
