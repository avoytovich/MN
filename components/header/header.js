import React, { Component } from 'react';
import { Link } from '../../routes';
import {
  Grid,
  Typography,
  AppBar,
  Avatar
} from '@material-ui/core';
import LongMenu from './icon-dropdown/icon-dropdown';
import get from 'lodash/get';
import DefaultAvatar from 'static/png/defaultAvatar.png';
import { withRouter } from 'next/router';
import MobileDrawer from './mobile-drawer'

import '../../sass/common.sass';
import './header.sass';
import { myRoleIs, isNewUser } from "../../services/accountService";

const adminLinks = [
  {
    route: '/',
    title: 'MetKnow',
    className: 'brand-title',
    variant: 'display1'
  },
  {
    route: '/admin',
    title: 'ADMIN',
    variant: 'display2',
    className: 'group-first-item'
  },
  {
    route: '/manage-groups',
    title: 'GROUPS',
    variant: 'display2'
  },
  { route: '/#landing-contact-us', title: 'CONTACT US', variant: 'display2' }
];

const userLinks = [
  {
    route: '/',
    title: 'MetKnow',
    className: 'brand-title',
    variant: 'display1'
  },
  {
    route: '/manage-groups',
    title: 'GROUPS',
    variant: 'display2'
  },
  { route: '/#landing-contact-us', title: 'CONTACT US', variant: 'display2' }
];

@withRouter
export default class Header extends Component {
  state = {
    previewImage: DefaultAvatar,
    isAdmin: false,
    isNewUser: false,
    title: ''
  }

  getLink = () => {
    const { isAdmin } = this.state;
    return isAdmin && adminLinks || userLinks;
  };

  componentDidMount(){
    const user = JSON.parse(window.localStorage.getItem('user'))
    const previewImage = get(user, 'profile.imageContent.previewImage')
    const { pathname } = this.props.router
    // console.log(this.props.router)
    // const paths = pathname.split('/')
    // const title = isEmpty
    let title = pathname.slice(1).split('-').join(' ').toUpperCase()
    if (title.includes('/')){
      title = title.split('/')[1]
    }
    this.setState({
      isAdmin: myRoleIs(),
      isNewUser: isNewUser(),
      previewImage
      previewImage,
      title
    })

  }

  render() {
    const { classes } = this.props;
    const { isNewUser, previewImage } = this.state;
    const { previewImage, title } = this.state
    const mobileLinks = this.getLink().slice(1)

    return (
      <div className="header-wrapper">
      <AppBar className="app-bar-container app-bar">
        <Grid
          alignItems="center"
          container
          className="app-bar-container-desktop"
        >
          <Link route="/">
            <div
              className="logo-image"
              style={{
                cursor: 'pointer',
                backgroundImage: 'url(/static/png/logo-image.png)'
              }}
            />
          </Link>
          <div className="links d-flex ai-center">
            {this.getLink().map((item, id) => {
              const { route, title, className, variant } = item;
              return (
                <Link key={id} route={isNewUser ? '' : route}>
                  <a>
                    <Typography className={className || ''} variant={variant}>
                      {title}
                    </Typography>
                  </a>
                </Link>
              );
            })}
          </div>
        </Grid>
        <Grid
          className="app-bar-container-desktop"
          alignItems="center"
          justify="flex-end"
          container
        >
          <Avatar
            className="app-bar-avatar"
            src={previewImage || DefaultAvatar}
          />
          <div className="icon-dropdown">
            <LongMenu />
          </div>
        </Grid>


        <Grid
          className="app-bar-container-mobile"
          alignItems="center"
          justify="space-between"
          container
        >
          <Link route="/">
            <div

              className="logo-image"
              style={{
                backgroundImage: 'url(/static/png/logo-image.png)'
              }}
            />
          </Link>
          <Typography className="app-bar-title">
            {title}
          </Typography>
          <MobileDrawer
            previewImage={previewImage || DefaultAvatar}
            links={mobileLinks}
          />
        </Grid>
      </AppBar>
      </div>
    );
  }
}
