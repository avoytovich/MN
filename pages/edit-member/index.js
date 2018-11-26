import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Button, Grid } from '@material-ui/core';
import Layout from 'components/MyLayout.js';
import SecondPanel from 'components/secondpanel';
import SearchPanel from 'components/searchpanel';
import Groups from 'components/groups';
import Footer from 'components/footer';
import CreateGroupBtn from 'components/secondpanel/creategroupbtn';
import { getProfile } from 'actions/profile'
import { getMember } from 'actions/member'
import EditMember from 'components/profile/member'
import get from 'lodash/get'

import 'components/profile/style.sass'

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
    if(memberId) {
      const data = await getMember(memberId)
      this.setState({ ...data })
    }
  }

  handleEdit = values => {
    this.setState({...values})
  }

  render() {
    const name = this.state ? this.state.firstName : ''
    const { groupId, memberId } = this.props.router.query
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Member"
              breadCrumb={`Manage Groups / Group / Member`}
              />
            <EditMember
              user={this.state}
              handleEdit={this.handleEdit}
              groupId={groupId}
              memberId = {memberId}
            />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
