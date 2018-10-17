import React, { Component } from 'react';
import { ListItem, List, Divider } from '@material-ui/core';
import GroupInfo from './groupinfo';
import Gallery from './gallery';

import './groups.scss';
import '../../sass/common.scss';

export default class Groups extends Component {
  render() {
    return (
      <List>
        <ListItem className="d-flex f-row">
          <GroupInfo />
          <Gallery />
        </ListItem>
        <Divider />
        <ListItem className="d-flex f-row">
          <GroupInfo />
          <Gallery />
        </ListItem>
        <Divider />
        <ListItem className="d-flex f-row">
          <GroupInfo />
          <Gallery />
        </ListItem>
        <Divider />
        <ListItem className="d-flex f-row">
          <GroupInfo />
          <Gallery />
        </ListItem>
        <Divider />
      </List>
    );
  }
}
