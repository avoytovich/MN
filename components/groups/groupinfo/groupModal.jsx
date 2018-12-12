import React, { Component } from 'react';
import { withStyles, Avatar, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateSpecData, resetData } from 'actions/updateData';
import map from 'lodash/map';
import classNames from 'classnames';
import { deleteGroup } from 'actions/groups';

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
    display: 'flex',
    position: 'absolute',
    bottom: 15
  },
  cgi: {
    fontSize: 24,
    color: '#224483',
    fontWeight: 'bold'
  },
  chosen: {
    border: '1px solid rgba(0,0,0,0.1)'
  },
  cancel: {
    marginRight: 20
  },
  text: {
    marginTop: 10,
    fontSize: 15
  }
});

@withStyles(styles)
@connect(
  ({ runtime }) => ({
    group: runtime.deleteGroupData
  }),
  {
    updateSpecData,
    deleteGroup,
    resetData
  }
)
export default class GroupDeleteModal extends Component {
  state = {
    chosen: {}
  };

  apply = () => {
    this.props.deleteGroup(this.props.group);
    this.props.resetData('deleteGroup', this.state.chosen);
    this.props.close();
  };

  render() {
    const { classes, close, icons } = this.props;
    return (
      <div className={classes.wrap}>
        <Typography align="center" className={classes.cgi}>
          Delete Group {this.props.group.name}
        </Typography>
        <Typography className={classes.text}>
          Are you sure you want to delete this group?
        </Typography>
        <div className={classes.actions}>
          <Button
            onClick={() => close()}
            className={classes.cancel}
            color="secondary"
            variant="outlined">
            Cancel
          </Button>
          <Button onClick={this.apply} color="primary" variant="contained">
            Save
          </Button>
        </div>
      </div>
    );
  }
}
