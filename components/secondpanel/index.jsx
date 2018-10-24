import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';

import './secondpanel.scss';
import BreadCrumbs from './breadcrumbs';
import CreateGroupBtn from './creategroupbtn';

export default class SecondPanel extends Component {
  render() {
    const { title, breadCrumb, actionButtons } = this.props;

    return (
      <div className="second-panel-wrapper d-flex ai-center">
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <div className="mr-auto margin-title">
              <Typography variant="title">{title}</Typography>
              <BreadCrumbs text={breadCrumb} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="ml-auto margin-add-group">
              <Grid container justify="flex-end" spacing={6}>
                {actionButtons.map(Element => <div style={{margin: 5}}>{Element}</div>)}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
