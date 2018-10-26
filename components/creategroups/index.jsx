import React, { Component, Fragment } from 'react';
import Main from './main';
import { Formik, Form, Field } from 'formik';
import SecondPanel from '../secondpanel';
import { Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { createGroup } from '../../actions/groups';
import { connect } from 'react-redux';
import * as Yup from 'yup';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createGroup
    },
    dispatch
  );
@connect(
  null,
  mapDispatchToProps
)
export default class CreateGroups extends Component {
  handleSubmit = (values, opt) => {
    console.log(values);
    this.props.createGroup(values);
  };

  render() {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Required'),
          description: Yup.string().required('Required')
        })}>
        {props => (
          <Form>
            <SecondPanel
              title="Create a Group"
              breadCrumb="Home / Create a Group"
              actionButtons={[
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>,
                <Button variant="contained" type="submit" color="primary">
                  Save
                </Button>
              ]}
            />
            <Main formik={props} />
          </Form>
        )}
      </Formik>
    );
  }
}
