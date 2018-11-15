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
import { wrapField } from 'services/materialformik';

import styles from './styles.js';
import withModal from '../../../services/decorators/withModal';
import IconModal from '../../iconmodal/';
import { Field } from 'formik';
import Subgroups from './subgroups.jsx';
import Questions from './questions';

const Main  = ({ classes, open, close, setFieldValue, handleChange, errors, icon, values }) => {
    return (
      <div className={classes.wrapper}>
        <Paper elevation={0} className={classes.paper}>
          <Typography className={classes.title}>Create a Group</Typography>
          <div className={classes.iconWrapper}>
            <Avatar
              onClick={() => open(true)}
              src={icon? icon.icon: ''}
              className={classes.icon}
            />
            <Typography onClick={() => open(true)} className={classes.sgi}>
              Select Group Icon
            </Typography>
            <SS />
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
            value={values.name}
            component={wrapField}
            name="name"
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
          <Typography className={classes.title}>Sub Groups</Typography>
          <Subgroups classes={classes} setFieldValue={setFieldValue}/>
        </Paper>
        <Paper elevation={0} className={classes.paper}>
          <Typography className={classes.title}>Question Answer</Typography>
          <Questions classes={classes} setFieldValue={setFieldValue}/>
        </Paper>
      </div>)
}

export default 
withModal(IconModal)
  (withStyles(styles)(Main));