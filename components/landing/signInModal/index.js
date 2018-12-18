import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button, TextField } from '@material-ui/core';
import { Formik, Form, Field, withFormik } from 'formik';
import { signIn } from 'actions/account'
import { getProfile } from 'actions/profile'
import { toggleSnackbar } from 'actions/snackbar'
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { createGroup } from '../../../actions/groups';
import Router from 'next/router'
import { withRouter } from 'next/router';
import { wrapField } from 'services/materialformik';
import '../style.sass';

import {changeQuery} from "services/serverService";

@withRouter
@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: Yup.object().shape({
    Email: Yup.string()
      .email('Invalid email')
      .required('Required field'),
    Password: Yup.string()
      .required('Required')
  }),

  handleSubmit: async (values, { props }) => {
    try {
     const data =  await signIn(values);
       await getProfile();
        Router.push({
          pathname: data.newUser ? '/edit-profile' : '/manage-groups'
        })
    } catch (e) {
      let message = 'Error';
      if(e.response)
        props.toggleSnackbar(e.response.data.errors[0].message, 'error');
      else
      console.log(e);
      
    }
  },
  mapPropsToValues: () => {
    return {
      Email: '',
      Password: ''
    }
  },

})
export default class IconModal extends Component {
  render() {
    const { handleBlur, handleChange, close, errors, values } = this.props;
    return (
      <div className="modal-wrap">
        <Typography align="center" className="modal-title">Sign In</Typography>
        <Form>
          <Field
            name="Email"
            fullWidth
            value={values.Email}
            label="Email"
            component={wrapField}
            className="modal-input"
          />
          <Field 
            fullWidth
            className="modal-input"
            name="Password"
            type="password"
            label="Password"
            value={values.Password}
            component={wrapField}
          />
          <Typography
            align="right"
            className="modal-forgot-password"
            onClick={() => Router.pushRoute(changeQuery(this.props.router, 'modal', 'forgotPassword'))}
          >
            Forgot password?
          </Typography>
          <Button type="submit" className="modal-submit">Sign in</Button>
          <Typography align="center" className="modal-have-not-account">Don`t have an account ?
            <Typography
              component="a"
              className="modal-sign-up"
              onClick={() => Router.pushRoute(changeQuery(this.props.router, 'modal', 'signUp'))}
            >
              Sign up
            </Typography>
          </Typography>
        </Form>
      </div>
    )
  }
}
