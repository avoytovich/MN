import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { Typography } from '@material-ui/core';

import './breadcrumbs.sass';

@withRouter
export default class BreadCrumbs extends Component {

  parrentRoute = () => {
    const { pathname } = this.props.router;
    return pathname.slice(0, pathname.lastIndexOf('/'));
  };
  clickParent = (e) => {
    e.preventDefault();
    //TODO history
    Router.back();
  } 
  render() {
    const { text } = this.props;
    let parentPathes = text.split('/');
    const childPath = text.slice(text.lastIndexOf('/') - 1);
    console.log(parentPathes);
    return (
      <Fragment>
        <Typography
          variant="caption"
          className="breadcrumbs-wrapper"
        >
          {
            parentPathes.slice(0, parentPathes.length - 1).map((el, key) => (
              <a style={{margin: 0, verticalAlign: 'baseline'}} onClick={this.clickParent}>
                <Typography className="title-chunk-parrent">
                  {el}{key !== parentPathes.length - 2 ? '/': ''}
                </Typography>
              </a>
            ))
          }
          <Typography className="title-chunk-child">
            {childPath}
          </Typography>
        </Typography>
      </Fragment>
    );
  }
}
