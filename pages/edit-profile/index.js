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
import EditProfile from 'components/profile/profile'
import get from 'lodash/get'

import 'components/profile/style.sass'

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
    let data
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.profile){
      data = user.profile
    } else{
      data =  await getProfile()
    }
    this.setState({...data})
  }

  handleEdit = values => {
    this.setState({...values})
  }


  render() {
    const name = this.state ? this.state.firstName : ''
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
              handleEdit={this.handleEdit}
            />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
