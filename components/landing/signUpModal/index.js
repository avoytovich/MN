import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button ,TextField} from '@material-ui/core';
import { Formik, Form, Field , withFormik } from 'formik';
import { signUp } from 'actions/account'
import { toggleSnackbar } from 'actions/snackbar'
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Router from 'next/router'

import style from '../styles'

const styles = theme => ( style );


@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: Yup.object().shape({
    OrganizationId: Yup.string().required('Required'),
    Email: Yup.string()
      .max(129, 'Invalid email')
      .email('Invalid email')
      .required('Required'),
    Password: Yup.string()
      .min(6, 'Password should be at least 6 symbols')
      .required('Required'),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref('Password'), null],'Confirm password field doesn’t match password')
      .required('Required')
  }),
  handleSubmit: async (values, { props }) => {

    try {
      await signUp(values)
      Router.push({
        pathname: '/home/manage-groups'
      })
    } catch (e) {
      // if(e.response)
        const  { message} = e.response.data.errors[0]
        props.toggleSnackbar(message, 'error')
      // else
      //   props.toggleSnackbar('Server error');

    }

  }
})
@withStyles(styles)
export default class IconModal extends Component {


  render() {
    const { classes, close ,errors} = this.props;
    return (
      <div className={classes.wrap}>
        <CloseIcon onClick={() => close()}/>
        <Typography align="center" className={classes.title}>Sign Up</Typography>
        <Form>
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.OrganizationId}
            error={this.props.errors.OrganizationId !== undefined}
            type="text"
            name="OrganizationId"
            placeholder="Organization Id"
            fullWidth
            margin="normal"
          />
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.Email}
            error={this.props.errors.Email !== undefined}
            type="email"
            name="Email"
            placeholder="Email"
            fullWidth
            margin="normal"
          />
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.Password}
            error={this.props.errors.Password !== undefined}
            type="password"
            name="Password"
            placeholder="Password"
            fullWidth
            margin="normal"
          />
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.ConfirmPassword}
            error={this.props.errors.ConfirmPassword !== undefined}
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm password"
            fullWidth
            margin="normal"
          />
          <Button type="submit"  className={classes.submit}>Sign Up</Button>
          <Typography align="center" className={classes.haveNotAccount}>Already have an account?
            <Typography component="a" className={classes.signUp}>Log In</Typography>

          </Typography>
        </Form>
      </div>
    )
  }
}
