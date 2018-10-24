import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button } from '@material-ui/core';

const styles = theme => ({
  wrap: {
    padding: '15px 40px'
  },
  wrapIcons: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'baseline'
  },
  icon: {
    margin: 10,
    width: 80,
    height: 80
  },
  actions: {
    marginTop: 10,
    display: 'flex'
  },
  cgi: {
    fontSize: 24,
    color: '#224483',
    fontWeight: 'bold',
  },
  cancel: {
    marginRight: 20
  }
});

@withStyles(styles)
export default class IconModal extends Component {
  render() {
    const { classes, close } = this.props;
    return (
      <div className={classes.wrap}>
        <Typography align="center" className={classes.cgi}>Change Group Icon</Typography>
        <div className={classes.wrapIcons}>
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
          <Avatar className={classes.icon} src="/static/png/icon-group.png" />
        </div>
        <div className={classes.actions}>
          <Button onClick={() => close()} className={classes.cancel} color="secondary" variant="outlined">Cancel</Button>
          <Button onClick={() => close()} color="primary" variant="contained">Save</Button>
        </div>
      </div>
    )
  }
}
