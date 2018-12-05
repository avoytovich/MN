import React, { Component } from 'react';
import { Link } from '../../routes';
import {
  Grid,
  Typography,
  AppBar,
  withStyles,
  Avatar
} from '@material-ui/core';
import LongMenu from './icon-dropdown/icon-dropdown';
import get from 'lodash/get';
import DefaultAvatar from 'static/png/defaultAvatar.png';

import '../../sass/common.scss';
import './header.sass';
import { myRoleIs } from "../../services/accountService";

const styles = theme => ({
  appBar: {
    position: 'relative',
    padding: 20,
    backgroundColor: '#224483',
    flexDirection: 'row'
  },
  avatar: {
    width: 51,
    height: 51
  }
});

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
    route: 'manage-groups',
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
    route: 'manage-groups',
    title: 'GROUPS',
    variant: 'display2'
  },
  { route: '/#landing-contact-us', title: 'CONTACT US', variant: 'display2' }
];

@withStyles(styles)
export default class Header extends Component {
  state = {
    previewImage: DefaultAvatar,
    isAdmin: false,
  }

  getLink = () => {
    const { isAdmin } = this.state;
    return isAdmin && adminLinks || userLinks;
  };

  componentDidMount(){
    const user = JSON.parse(window.localStorage.getItem('user'))
    const previewImage = get(user, 'profile.imageContent.previewImage')
    this.setState({
      isAdmin: myRoleIs(),
      previewImage
    })

  }

  render() {
    const { classes } = this.props;
    const { previewImage } = this.state
    return (
      <AppBar className={classes.appBar}>
        <Grid alignItems="center" container>
          <div
            className="logo-image"
            style={{
              backgroundImage: 'url(/static/png/logo-image.png)'
            }}
          />
          <div className="links d-flex ai-center">
            {this.getLink().map((item, id) => {
              const { route, title, className, variant } = item;
              return (
                <Link key={id} route={route}>
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
        <Grid alignItems="center" justify="flex-end" container>
          <Avatar
            className={classes.avatar}
            src={previewImage || DefaultAvatar}
          />
          <div className="icon-dropdown">
            <LongMenu />
          </div>
        </Grid>
      </AppBar>
    );
  }
}
