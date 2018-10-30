import { Component, ComponentType } from 'react';
import { Typography, Grid } from '@material-ui/core';

import './secondpanel.scss';
import BreadCrumbs from './breadcrumbs';

interface PanelProps {
  title: string,
  breadCrumb: string,
  actionButtons?: JSX.Element[],
  centerButtons?: JSX.Element[]
}


export default class SecondPanel extends Component<PanelProps> {
  render() {
    const { title, breadCrumb, actionButtons = [], centerButtons = [] } = this.props;

    return (
      <div className="second-panel-wrapper d-flex ai-center">
        <Grid container alignItems="center">
          <Grid item xs={4} sm={4}>
            <div className="mr-auto margin-title">
              <Typography variant="title">{title}</Typography>
              <BreadCrumbs text={breadCrumb} />
            </div>
          </Grid>
          <Grid container xs={4} sm={4} justify="center">
            {centerButtons.map(Element => Element)}
          </Grid>
          <Grid item xs={4} sm={4}>
            <div className="ml-auto margin-add-group">
              <Grid container justify="flex-end" spacing={8}>
                {actionButtons.map(Element => <div style={{margin: 5}}>{Element}</div>)}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
