import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button, TextField } from '@material-ui/core';
import { Formik, Form, Field, withFormik } from 'formik';
import { signIn } from 'actions/account'
import { toggleSnackbar } from 'actions/snackbar'
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { createGroup } from '../../../actions/groups';
import Router from 'next/router'
import { wrapField } from 'services/materialformik';
import style from '../styles'

const styles = theme => (style);

@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: Yup.object().shape({
    Email: Yup.string()
      .email('Invalid email')
      .required('Required field')
      ,
    Password: Yup.string()
      .required('Required')
  }),

  handleSubmit: async (values, { props }) => {
    try {
      await signIn(values)
      Router.push({
        pathname: '/home/manage-groups'
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
@withStyles(styles)
export default class IconModal extends Component {
  render() {
    const { classes, handleBlur, handleChange, close, errors, values } = this.props;
    console.log(errors);
    return (
      <div className={classes.wrap}>
        <CloseIcon onClick={() => close()} />
        <Typography align="center" className={classes.title}>Sign In</Typography>
        <Form>
          <Field
            name="Email"
            fullWidth
            value={values.Email}
            label="Email"
            component={wrapField}
            className={classes.input}
          />
          <Field 
            fullWidth
            className={classes.input}
            name="Password"
            type="password"
            label="Password"
            value={values.Password}
            component={wrapField}
          />
          <Typography align="right" className={classes.forgorPassword}>Forgot password?</Typography>
          <Button type="submit" className={classes.submit}>Sign in</Button>
          <Typography align="center" className={classes.haveNotAccount}>Don`t have an account ?
            <Typography component="a" className={classes.signUp}>Sign up</Typography>
          </Typography>
        </Form>
      </div>
    )
  }
}
