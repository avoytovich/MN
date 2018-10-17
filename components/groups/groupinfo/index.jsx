import React, { Component } from 'react';
import { Typography, Divider } from '@material-ui/core';

import '../../../sass/common.scss';
import './groupinfo.scss';

export default class GroupInfo extends Component {
  render() {
    return (
      <div className="d-flex f-row">
        <div className="group-icon" />
        <div className="d-flex f-column margin-info">
          <Typography variant="subheading">
            Accounting Department Demo
          </Typography>
          <Typography className="members-count" variant="caption">
            28 members
          </Typography>
          <Typography className="last-update" variant="caption">
            Last upldate 7/6/2018 09.06pm
          </Typography>
          <Divider />
          <div className="actions-block d-flex jcc ai-center">
            <div className="d-flex edit ai-center">
              <div className="icon" />
              <Typography className="edit-text" variant="caption">edit</Typography>
            </div>
            <div className="divider" />
            <div className="move d-flex ai-center">
              <div className="icon" />
              <Typography className="move-text" variant="caption">move</Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
