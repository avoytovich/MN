import React, { Component } from 'react';
import {
  withStyles,
  Avatar,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import { Formik, Form, Field, withFormik } from 'formik';
import { changePassword } from 'actions/account';
import { toggleSnackbar } from 'actions/snackbar';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Router from 'next/router';

import style from '../styles';

const styles = theme => style;

@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 symbols')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Confirm password field doesn’t match password'
      )
      .required('Required')
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const { message } = await changePassword(values);
      props.toggleSnackbar(message, 'success');
      props.close();
    } catch (e) {
      // if(e.response)
      console.log(e);
      console.log(e.response);
      console.log(e.response.data);
      console.log(e.response.data.errors[0]);
      const { message } = e.response.data.errors[0];
      props.toggleSnackbar(message, 'error');
      // else
      //   props.toggleSnackbar('Server error');
    }
  }
})
@withStyles(styles)
export default class IconModal extends Component {
  render() {
    const { classes, close, errors } = this.props;
    return (
      <div className={classes.wrap}>
        <CloseIcon onClick={() => close()} />
        <Typography align="center" className={classes.title}>
          Change Password
        </Typography>
        <Form>
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.oldPassword}
            error={this.props.errors.oldPassword !== undefined}
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            fullWidth
            margin="normal"
          />
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.password}
            error={this.props.errors.password !== undefined}
            type="password"
            name="password"
            placeholder="New Passsword"
            fullWidth
            margin="normal"
          />
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.confirmPassword}
            error={this.props.errors.confirmPassword !== undefined}
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            className={`${classes.submit} ${classes.changePassword}`}>
            Change Password
          </Button>
        </Form>
      </div>
    );
  }
}
