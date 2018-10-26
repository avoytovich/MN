import React, { Component } from 'react';
import Link from 'next/link';
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  withStyles,
  Button,
  Icon,
  Select,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import SS from '@material-ui/icons/ArrowDropDown';

import styles from './styles.js';
import withModal from '../../../services/decorators/withModal';
import IconModal from '../../iconmodal/';
import { Field } from 'formik';
import Subgroups from './subgroups.jsx';

const questions = [
  {
    value: 1,
    label: 'What is you favorite past-time?'
  },
  {
    value: 2,
    label: 'What is the maiden name of your mother?'
  }
];

@withModal(IconModal)
@withStyles(styles)
export default class Main extends Component {
  state = {
    question: 1
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const { classes, open, close, formik } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper elevation={0} className={classes.paper}>
          <Typography className={classes.title}>Create a Group</Typography>
          <div className={classes.iconWrapper}>
            <Avatar
              onClick={() => open(true)}
              src="/static/png/icon-group.png"
              className={classes.icon}
            />
            <Typography onClick={() => open(true)} className={classes.sgi}>
              Select Group Icon
            </Typography>
            <SS />
          </div>
          <TextField
            onChange={formik.handleChange}
            InputProps={{
              className: classes.text
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.label
            }}
            helperText={formik.errors.name}
            error={formik.errors.name !== undefined}
            name="name"
            placeholder="Group name"
            fullWidth
            margin="normal"
          />
          <TextField
            InputProps={{
              className: classes.text
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.label
            }}
            helperText={formik.errors.description}
            error={formik.errors.description !== undefined}
            name="description"
            onChange={formik.handleChange}
            placeholder="Description"
            fullWidth
            name="description"
            margin="normal"
          />
        </Paper>
        <Paper elevation={0} className={classes.paper}>
          <Typography className={classes.title}>Sub Groups</Typography>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={10}>
              <TextField
                InputProps={{
                  className: classes.text
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.label
                }}
                placeholder="New Subgroup name"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                className={classes.addButton}
                variant="contained"
                color="primary">
                <div className={classes.plusIcon} />
                <Typography className={classes.addText}>add</Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Subgroups formik={formik} />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={0} className={classes.paper}>
          <Typography className={classes.title}>Question Answer</Typography>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={10}>
              <TextField
                InputProps={{
                  className: classes.text
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.label
                }}
                placeholder="Add new question"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                className={classes.addButton}
                variant="contained"
                color="primary">
                <div className={classes.plusIcon} />
                <Typography className={classes.addText}>add</Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
