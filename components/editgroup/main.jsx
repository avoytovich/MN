import React, { Component } from 'react';
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
  IconButton,
  NoSsr
} from '@material-ui/core';
import styles from './styles';
import get from 'lodash/get';
import Subgroups from './subgroups';
import Questions from './questions';
import withModal from 'services/decorators/withModal';
import IconModal from 'components/iconmodal';
import { wrapField } from 'services/materialformik';
import { Field } from 'formik';

const Main = ({ classes, group, setFieldValue, open, values, chosenIcon }) => {
  const subgroups = get(group, 'subgroups', []);
  const id = get(group, 'id');
  // Showing either group icon or changed icon
  const icon = get(chosenIcon, 'icon') || get(group, 'icon');
  return (
    <div className={classes.wrapper}>
      <Paper elevation={0} className={classes.paper}>
        <Typography className={classes.title}>Edit Group</Typography>
        <div className={classes.iconWrapper}>
          <NoSsr>
            <Avatar
              onClick={() => open(true)}
              src={icon}
              className={classes.icon}
            />
          </NoSsr>
          <Typography onClick={() => open(true)} className={classes.sgi}>
            Select Group Icon
          </Typography>
        </div>
        <Field
          fullWidth
          InputProps={{
            className: classes.text
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.label
          }}
          className={classes.input}
          name="name"
          component={wrapField}
          placeholder="Group name"
          margin="normal"
          value={values.name}
        />
        <Field
          InputProps={{
            className: classes.text
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.label
          }}
          value={values.description}
          component={wrapField}
          name="description"
          placeholder="Description"
          fullWidth
          margin="normal"
        />
      </Paper>
      <Paper elevation={0} className={classes.paper}>
        <Typography className={classes.title}>Subgroups</Typography>
        <Subgroups
          subgroups={subgroups}
          classes={classes}
          setFieldValue={setFieldValue}
          id={id}
        />
      </Paper>
      <Paper elevation={0} className={classes.paper}>
        <Typography className={classes.title}>Questions</Typography>
        <Questions setFieldValue={setFieldValue} classes={classes} />
      </Paper>
    </div>
  );
};

export default withModal(IconModal)(withStyles(styles)(Main));
