import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button, TextField } from '@material-ui/core';
import { Formik, Form, Field, withFormik } from 'formik';
import { resetPassword } from 'actions/account'
import { toggleSnackbar } from 'actions/snackbar'
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Router from 'next/router'
import { wrapField } from 'services/materialformik';
import '../style.sass'

@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: Yup.object().shape({
    Email: Yup.string()
      .email('Invalid email')
      .required('Required field')
  }),

  handleSubmit: async (values, { props }) => {
    try {
      await resetPassword(values)
      Router.push({
        pathname: '/manage-groups'
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
      Email: ''
    }
  },

})
export default class IconModal extends Component {
  render() {
    const { handleBlur, handleChange, close, errors, values } = this.props;
    return (
      <div className="modal-wrap">
        <Typography align="center" className="modal-title">Reset password</Typography>
        <Typography align="center" className="modal-description">
          Please check your mailbox to find reset password instructions
        </Typography>

        <Form>
          <Field
            name="Email"
            fullWidth
            value={values.Email}
            label="Email"
            component={wrapField}
            className="modal-input"
          />
          <Button type="submit" className="modal-submit">Continue</Button>
        </Form>
      </div>
    )
  }
}
