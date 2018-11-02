import React, { Component } from 'react';
import Link from 'next/link';
import { Grid, Typography, AppBar, withStyles, Avatar } from '@material-ui/core';
import LongMenu from './icon-dropdown/icon-dropdown';

import '../../sass/common.scss';
import './header.sass';

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

@withStyles(styles)
export default class Header extends Component {
  getLink = () => [
    {
      href: '/',
      title: 'MetKnow',
      className: 'brand-title',
      variant: 'display1'
    },
    {
      href: '/home/manage-groups',
      className: 'group-first-item',
      title: 'GROUPS',
      variant: 'display2'
    },
    { href: '/contact', title: 'CONTACT US', variant: 'display2' }
  ];

  render() {
    const { classes } = this.props;
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
              const { href, title, className, variant } = item;
              return (
                <Link key={id} href={href}>
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
        <Grid alignItems="center" justify="flex-end" container xs={2} sm={2}>
          <Avatar
            className={classes.avatar}
            src="/static/png/image-member.png"
          />
          <div className="icon-dropdown">
            <LongMenu />
          </div>
        </Grid>
      </AppBar>
    );
  }
}
