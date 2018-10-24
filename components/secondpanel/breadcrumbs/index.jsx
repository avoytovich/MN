import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

export default class BreadCrumbs extends Component {
  render() {
    const { text } = this.props;
    return <Typography variant="caption">{text}</Typography>;
  }
}
