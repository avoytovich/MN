import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import Typography from '../../material-wrap/typography';
import Button from '../../material-wrap/button';
import constant from '../../../constants/texts';

import './verify.sass';

export default class VerifyModal extends Component {
  /* handleClick = () => (Router.push({
      pathname: '/manage-groups'
    })); */

  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className="verify-modal">
        <Typography variant="title" fontSize="24px" className="verify-email">
          {constant.verifyEmail}
        </Typography>
        <Button onClick={this.props.onClose}>{constant.ok}</Button>
      </Grid>
    );
  }
}
