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
        <Typography
          variant="caption"
          className="breadcrumbs-wrapper"
        >
          <Link href={{ pathname: `${this.parrentRoute()}` }}>
            <Typography className="title-chunk-parrent">
              { (parrentPath !== 'Manage groups ') ? '' : parrentPath }
            </Typography>
          </Link>
          <Typography className="title-chunk-child">
            {childPath}
          </Typography>
        </Typography>
      </Fragment>
    );
  }
}
