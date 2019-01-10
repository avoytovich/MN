import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { Typography } from '@material-ui/core';
import { isNewUser } from "../../../services/accountService";

import './breadcrumbs.sass';

@withRouter
export default class BreadCrumbs extends Component {

  state = {
    isNewUser: false,
  }

  componentDidMount() {
    this.setState({
      isNewUser: isNewUser(),
    })
  }

  handlePath = (el, key) => {
    const { text } = this.props;
    const path = text.split('/');
    return (key && key != path.length -1) ?
      Router.back() : key == path.length -1 ?
        null : Router.push({pathname: `/${el.toLowerCase().replace(' ', '-')}`});
  }

  render() {
    const { text } = this.props;
    const { isNewUser } = this.state;
    const path = text.split('/');
    return (
      <Fragment>
        <Typography
          variant="caption"
          className="breadcrumbs-wrapper"
        >
          {
            path.slice(0, path.length).map((el, key) => (
              <a style={{margin: 0, verticalAlign: 'baseline'}}
                 onClick={() => {
                   isNewUser ? null : this.handlePath(el, key);
                }}
              >
                <Typography className={isNewUser ? 'title-chunk-new-user' : "title-chunk"}>
                  {`${el}${key !== path.length - 1 ? `/` : ''}`}
                </Typography>
              </a>
            ))
          }
        </Typography>
      </Fragment>
    );
  }
}
