import React, { Component, Fragment } from 'react';
import { Formik, Form, Field, withFormik } from 'formik';
import { Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { setData } from 'actions/updateData';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Router from 'next/router';
import { loadIcons } from 'actions/groups';
import { resetData } from 'actions/updateData';
import get from 'lodash/get';
import { Link } from '../../routes';
import { createGroup } from '../../actions/groups';
import SecondPanel from '../secondpanel';
import Main from './main';

@connect(
  ({ runtime }) => ({
    icon: runtime.chosenIconData
  }),
  {
    createGroup,
    loadIcons,
    resetData
  }
)
@withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required')
  }),
  mapPropsToValues: props => ({
    name: '',
    description: '',
    subgroups: [],
    questions: []
  }),
  handleSubmit: (values, { props }) => {
    values.iconId = get(props, 'icon.id');
    props.createGroup(values).then(r => {
      Router.push('/manage-groups');
    });
  }
})
export default class CreateGroups extends Component {
  componentDidMount = () => {
    this.props.loadIcons();
  };

  componentWillUnmount = () => {
    this.props.resetData('chosenIcon');
  };

  render() {
    const { handleChange, values, errors, setFieldValue, icon } = this.props;
    return (
      <Form>
        <SecondPanel
          title="Create a Group"
          breadCrumb="Manage Groups / Create a Group"
          actionButtons={[
            <Link route="manage-groups">
              <a>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
              </a>
            </Link>,
            <Button variant="contained" type="submit" color="primary">
              Save
            </Button>
          ]}
        />
        <Main
          icon={icon}
          errors={errors}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          values={values}
        />
      </Form>
    );
  }
}
