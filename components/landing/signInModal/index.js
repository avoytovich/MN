import React, { Component } from 'react'
import { withStyles, Avatar, Typography, Button ,TextField} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { signIn } from '../../../actions/account'
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
const styles = theme => ({
  wrap: {
    padding: '15px 40px'
  },
  wrapIcons: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'baseline'
  },
  icon: {
    margin: 10,
    width: 80,
    height: 80
  },
  actions: {
    marginTop: 10,
    display: 'flex'
  },
  title: {
    fontSize: 45,
    color: '#224483',
    fontWeight: '500'
  },
  cancel: {
    marginRight: 20
  },
  input: {
    width:'100%',
    height: 60,
    fontSize: 18,
    marginBottom: 18
  },
  forgorPassword:{
    fontWeight:'300',
    lineHeight: '10px',
    fontSize:17,
    color: '#224483'
  },
  submit:{
    marginTop: 40,
    width:'100%',
    backgroundColor: 'rgba(42, 184, 184, 1)',
    height:60,
    color:'white',
    fontSize: 17,
    textTransform: 'none',
    fontWeight:'bold',
    '&:hover': {
      backgroundColor: 'rgba(32, 67, 133, 1)'
    }
  },
  haveNotAccount:{
    fontSize: 20,
  color: 'rgba(32, 67, 133, 1)',

    marginTop:30,
  lineHeight: '30px'
},
  signUp:{
    fontSize: '20px',
    color: 'rgba(42, 184, 184, 1)',
    lineHeight: '30px',
    fontWeight:'500',
    display:'inline',
    marginleft:'10px'
  }

});

@withStyles(styles)
export default class IconModal extends Component {
  handleSubmit = (values) => {
    signIn(values);
  };


  render() {
    console.log(this.props)
    const { classes, close ,errors} = this.props;
    return (
      <div className={classes.wrap}>
        <CloseIcon onClick={() => close()}/>
        <Typography align="center" className={classes.title}>Sign In</Typography>

        <Formik
          onSubmit={this.handleSubmit}
          initialValues={{
            Email: '',
            Password: ''
          }}
          validationSchema={Yup.object().shape({
            //   email: Yup.string()
            //     .email('Invalid email')
            //     .required('Required'),
            //
            // password: Yup.string().required('Required')
          })}>
          {props => (
            <Form>
              <Field
                className={classes.input}
                // onChange={this.handleChange}
                helperText={props.errors.Email}
                error={props.errors.Email !== undefined}
                type="email"
                name="Email"
                placeholder="Group name"
                fullWidth
                margin="normal"
              />
              <Field
                className={classes.input}
                helperText={props.errors.Password}
                error={props.errors.Password !== undefined}
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
          )}
        </Formik>


      </div>
    )
  }
}
