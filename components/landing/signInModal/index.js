import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button ,TextField} from '@material-ui/core';
import { Formik, Form, Field , withFormik } from 'formik';
import { signIn } from 'actions/account'
import { toggleSnackbar } from 'actions/snackbar'
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { createGroup } from '../../../actions/groups';
import Router from 'next/router'

import style from '../styles'

const styles = theme => ( style );


@connect(
  null,
  { toggleSnackbar }
)
@withFormik({
  validationSchema: Yup.object().shape({
      Email: Yup.string()
        .email('Invalid email')
        .required('Required'),

    Password: Yup.string().required('Required')
  }),
  handleSubmit : async (values, { props }) => {
    try {
      await signIn(values)
      Router.push({
        pathname: '/home/manage-groups'
      })
    } catch (e) {
      const { message} = e.response.data.errors[0]
      props.toggleSnackbar(message, 'error')
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
        <Typography align="center" className={classes.title}>Sign In</Typography>
        <Form>
          <TextField
            className={classes.input}
            onChange={this.props.handleChange}
            helperText={this.props.errors.Email}
            error={this.props.errors.Email !== undefined}
            type="email"
            name="Email"
            placeholder="Group name"
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
            placeholder="Group name"
            fullWidth
            margin="normal"
          />
          <Typography align="right" className={classes.forgorPassword}>Forgot password?</Typography>
          <Button type="submit"  className={classes.submit}>Sign in</Button>
          <Typography align="center" className={classes.haveNotAccount}>Don`t have an account ?
            <Typography component="a" className={classes.signUp}>Sign up</Typography>

          </Typography>
        </Form>
      </div>
    )
  }
}
