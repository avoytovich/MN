import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Typography } from '@material-ui/core';

import './breadcrumbs.sass';

@withRouter
export default class BreadCrumbs extends Component {

  parrentRoute = () => {
    const {pathname} = this.props.router;
    return pathname.slice(0, pathname.lastIndexOf('/'));
  };

  render() {
    const { text } = this.props;
    const parrentPath = text.slice(0, text.lastIndexOf('/'));
    const childPath = text.slice(text.lastIndexOf('/'));
    return (
      <Fragment>
        <Link href={{ pathname: `${this.parrentRoute()}` }}>
          <Typography
            variant="caption"
            className="breadcrumbs-wrapper"
          >
            <Typography className="title-chunk-parrent">
              {parrentPath}
            </Typography>
            <Typography className="title-chunk-child">
              {childPath}
            </Typography>
          </Typography>
        </Link>
      </Fragment>
    );
  }
}
