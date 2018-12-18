import React, { Component } from 'react';
import {
  withStyles,
  Avatar,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import { Formik, Form, Field, withFormik } from 'formik';
import { signUp } from 'actions/account';
import { toggleSnackbar } from 'actions/snackbar';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Router from 'next/router';
import { withRouter } from 'next/router';
import { signUpSchema } from 'services/validateSchemas';
import omit from 'lodash/omit'
import { wrapField } from 'services/materialformik'
import {changeQuery} from "services/serverService";

import '../style.sass';

const inputNames = [
  { name: "OrganizationId", label: "OrganizationId", type:"text" },
  { name: "Email", label: "Email", type:"email" },
  { name: "Password", label: "Password", type:"password" },
  { name: "ConfirmPassword", label: "Confirm Password", type:"password" },
  { name: "Title", label: "Position", type:"text" },
  { name: "Firstname", label: "First Name", type:"text" },
  { name: "LastName", label: "Last Name", type:"text" },
  { name: "Department", label: "Department", type:"text" }
]

@withRouter
@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: prop => signUpSchema,
  handleSubmit: async (values, { props }) => {
    try {
      await signUp(omit(values, ['router']));
      Router.pushRoute(changeQuery(props.router, 'modal', 'verify'));
      /*Router.push({
        pathname: '/manage-groups'
      });*/
    } catch (e) {
      // if(e.response)
        const  { message} = e.response.data.errors[0]
        props.toggleSnackbar(message, 'error')
      // else
      //   props.toggleSnackbar('Server error');

    }
  }
})
export default class IconModal extends Component {
  render() {
    const { classes, errors, values } = this.props;
    return (
      <div className="modal-wrap">
        <Typography align="center" className="modal-title">
          Sign Up
        </Typography>
        <Form>
          {inputNames.map(inputInfo => {
            const { name, label, type } = inputInfo
            return (
              <Field
                className="modal-input"
                value={values[name]}
                onChange={this.props.handleChange}
                type={type}
                name={name}
                label={label}
                fullWidth
                component={wrapField}
                margin="normal"
                key={name}
              />
            )
          })}
          <Button type="submit" className="modal-submit">
            Sign Up
          </Button>
          <Typography align="center" className="modal-have-not-account">
            Already have an account?
            <Typography
              component="a"
              className="modal-sign-up"
              onClick={() => Router.pushRoute(changeQuery(this.props.router, 'modal', 'signIn'))}
            >
              Log In
            </Typography>
          </Typography>
        </Form>
      </div>
    );
  }
}
