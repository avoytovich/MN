import React, { Component, Fragment } from 'react';
import {
  ListItem,
  List,
  Typography,
  Button,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  TextField,
  Icon,
  withStyles
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Trash from '@material-ui/icons/Delete';
import _ from 'lodash';

export default class Subgroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subgroups: [],
      val: ''
    };  
  }

  addSubgroup = () => {
    if (!this.state.val.length) return;
    // TODO: solve empty description
    const newGroups = [...this.state.subgroups, {name: this.state.val, description: ''}];
    this.props.formik.setFieldValue('subgroups', newGroups);
    this.setState({
      subgroups: newGroups,
      val: ''
    });
  };
  handleChange = e => {
    this.setState({ val: e.target.value });
  };
  editGroup = k => e => {
    this.setState({
      val: this.state.subgroups[k],
      subgroups: _.filter(this.state.subgroups, (sg, key) => key !== k)
    });
  };
  deleteGroup = k => e => {
    const newGroups = _.filter(this.state.subgroups, (sg, key) => key !== k);
    this.props.formik.setFieldValue('subgroups', newGroups);
    this.setState({
      subgroups: newGroups
    });
  };
  render() {
    const { classes } = this.props;
    const { subgroups } = this.state;
    return (
      <Fragment>
        <Grid container alignItems="center" spacing={0}>
          <Grid item xs={10}>
            <TextField
              InputProps={{
                className: classes.text
              }}
              value={this.state.val}
              InputLabelProps={{
                shrink: true,
                className: classes.label
              }}
              onChange={this.handleChange}
              placeholder="New Subgroup name"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.addButton}
              variant="contained"
              onClick={this.addSubgroup}
              color="primary">
              <div className={classes.plusIcon} />
              <Typography className={classes.addText}>add</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {subgroups.map((el, key) => (
                <ListItem key={`group-${key}`}>
                  <ListItemText>
                    <Typography>{el.name}</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={this.editGroup(key)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={this.deleteGroup(key)}>
                      <Trash />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
