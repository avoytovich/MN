import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { updateSpecData } from 'actions/updateData';
import map from 'lodash/map';
import classNames from 'classnames';

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
    height: 80,
    cursor: 'pointer'
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
  chosen: {
    border: '1px solid rgba(0,0,0,0.1)'
  },
  cancel: {
    marginRight: 20
  }
});

@withStyles(styles)
@connect(({runtime}) => ({
  icons: map(runtime.loadIconsData)
}),
 {
  updateSpecData,
})
export default class IconModal extends Component {
  state = {
    chosen: {}
  }

  choose = icon => () => {
    this.setState({
      chosen: icon
    })
  }

  apply = () => {
    this.props.updateSpecData('chosenIcon', this.state.chosen);
    this.props.close();
  }

  render() {
    const { classes, close, icons } = this.props;
    return (
      <div className={classes.wrap}>
        <Typography align="center" className={classes.cgi}>Change Group Icon</Typography>
        <div className={classes.wrapIcons}>
          {
            icons.map(icon => (
              <Avatar onClick={this.choose(icon)} key={`icon-${icon.id}`} className={
                classNames(
                  classes.icon,
                  this.state.chosen.id === icon.id? classes.chosen:null )
                } src={icon.icon} />
            ))
          }
        </div>
        <div className={classes.actions}>
          <Button onClick={() => close()} className={classes.cancel} color="secondary" variant="outlined">Cancel</Button>
          <Button onClick={this.apply} color="primary" variant="contained">Save</Button>
        </div>
      </div>
    )
  }
}
