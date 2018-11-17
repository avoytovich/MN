import { Component, Fragment } from 'react';
import { Typography, Grid, withStyles, createStyles, WithStyles } from '@material-ui/core';

import BreadCrumbs from './breadcrumbs';

interface PanelProps extends WithStyles<typeof styles>{
  title: string,
  breadCrumb: string,
  actionButtons?: JSX.Element[],
  centerButtons?: JSX.Element[],
}

const styles = (theme:Theme) => createStyles({
  root: {
    height: 74,
    backgroundCcolor: '#fafafa',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  title: {
    marginLeft: 37
  },
  actionButtons: {
    paddingRight: 20
  }
})

@withStyles(styles)
export default class SecondPanel extends Component<PanelProps> {
  render() {
    const { title, breadCrumb, actionButtons = [], centerButtons = [], classes } = this.props;

    return (
        <Grid container className={classes.root} alignItems="center">
          <Grid item xs={4} sm={4}>
            <div className={classes.title}>
              <Typography variant="title">{title}</Typography>
              <BreadCrumbs text={breadCrumb} />
            </div>
          </Grid>
          <Grid item xs={4} sm={4} className="custom-button">
            {centerButtons.map((Element, k) => <Fragment key={`center-${k}`}>{Element}</Fragment>)}
          </Grid>
          <Grid item xs={4} sm={4} className={classes.actionButtons} >
              <Grid container justify="flex-end" spacing={8}>
                {actionButtons.map((Element, k) => <div key={`action-${k}`} style={{margin: 5}}>{Element}</div>)}
              </Grid>
          </Grid>
        </Grid>
    );
  }
}
