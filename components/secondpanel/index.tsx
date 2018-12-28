import { Component, Fragment } from 'react';
import { Typography, Grid, withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';

import BreadCrumbs from './breadcrumbs';

import './index.sass'

interface PanelProps {
  title: string,
  breadCrumb: string,
  actionButtons?: JSX.Element[],
  centerButtons?: JSX.Element[],
}

class SecondPanel extends Component<PanelProps> {
  render() {
    const { title, breadCrumb, actionButtons = [], centerButtons = [] } = this.props;

    return (
      <Grid container className="second-panel-container" alignItems="center">
        <Grid item xs={6} sm={6} md={4}>
          <div className="second-panel-title">
            <Typography noWrap variant="title">{title}</Typography>
            <BreadCrumbs text={breadCrumb} />
          </div>
        </Grid>
        {
          centerButtons.length ?
            <Fragment>
              <Grid item xs={3} sm={3} md={4} className="custom-button">
                {centerButtons.map((Element, k) => <Fragment key={`center-${k}`}>{Element}</Fragment>)}
              </Grid>
              <Grid item xs={3} sm={3} md={4} className="second-panel-action-buttons" >
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                  {actionButtons.map((Element, k) => <span key={`action-${k}`} style={{ margin: 5 }}>{Element}</span>)}
                </div>
              </Grid>
            </Fragment>
            :
            <Grid item xs={6} sm={6} md={8} className="second-panel-action-buttons">
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                {actionButtons.map((Element, k) => <span key={`action-${k}`} style={{ margin: 5 }}>{Element}</span>)}
              </div>
            </Grid>
        }

      </Grid>
    );
  }
}

export default SecondPanel;