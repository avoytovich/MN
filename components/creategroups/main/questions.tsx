import React, { Component, Fragment, SyntheticEvent, FormEvent } from 'react';
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
import * as _ from 'lodash';

export default class Questions extends Component<{
  setFieldValue: Function;
  classes: any;
}> {

  state = {
    subgroups: [],
    val: ''
  };

  addSubgroup = () => {
    if (!this.state.val.length) return;
    const newGroups = [...this.state.subgroups, this.state.val];
    this.props.setFieldValue('questions', newGroups);
    this.setState({
      subgroups: newGroups,
      val: ''
    });
  };
  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ val: e.currentTarget.value });
  };
  editGroup = (k: any) => (e: any) => {
    this.setState({
      val: this.state.subgroups[k],
      subgroups: _.filter(
        this.state.subgroups,
        (sg: string, key: number) => key !== k
      )
    });
  };
  deleteGroup = (k: number) => (e: SyntheticEvent) => {
    const newGroups = _.filter(
      this.state.subgroups,
      (sg: string, key: number) => key !== k
    );
    this.props.setFieldValue('questions', newGroups);
    this.setState({
      subgroups: newGroups
    });
  };
  render() {
    const { classes } = this.props;
    const { subgroups } = this.state;
    return (
      <>
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
              placeholder="Your question"
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
                <ListItem key={`question-${key}`}>
                  <ListItemText>
                    <Typography>{el}</Typography>
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
      </>
    );
  }
}
