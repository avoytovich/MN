import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import './secondpanel.scss';
import BreadCrumbs from './breadcrumbs';
import CreateGroupBtn from './creategroupbtn';

export default class SecondPanel extends Component {
  render() {
    return (
      <div className="second-panel-wrapper d-flex ai-center">
        <div className="mr-auto margin-title">
          <Typography variant="title">Manage Groups</Typography>
          <BreadCrumbs />
        </div>
        <div className="ml-auto margin-add-group">
          <CreateGroupBtn />
        </div>
      </div>
    );
  }
}
