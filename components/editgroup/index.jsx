import { Component } from 'react';
import Main from './main';
import { Form, withFormik } from 'formik';
import SecondPanel from '../secondpanel';
import { Button, NoSsr } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { createQuestions } from 'actions/questions';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import {Link} from '../../routes';
import { withRouter } from 'next/router';
import find from 'lodash/find';
import get from 'lodash/get';
import NoSSR from '@material-ui/core/NoSsr'
import { loadIcons, getSingle, editGroup } from 'actions/groups';
import { resetData } from 'actions/updateData';

const mapStateToProps = ({ groups, questions, runtime }, { router }) => ({
  group: find(groups.groups, g => g.id === parseInt(router.query.id, 10)),
  icon: runtime.chosenIconData
});

@withRouter
@connect(
  mapStateToProps,
  {
    editGroup, getSingle, createQuestions,
    loadIcons, resetData,
    getSingle
  }
)
@withFormik({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required')
  }),
  mapPropsToValues: props => {
    const name = get(props, 'group.name');
    const desc = get(props, 'group.description');
    const id = get(props, 'group.id');
    return {
      subgroups: [],
      questions: [],
      name: name,
      description: desc,
      id
    };
  },
  handleSubmit: async (values, { props }) => {
    const iconId = get(props, 'icon.id');
    await props.editGroup({
      name: values.name,
      description: values.description,
      id: values.id,
      iconId: iconId
    })
    await props.createQuestions({
      groupId: values.id,
      text: values.questions
    })
    props.router.push('/manage-groups');
  }
})
export default class EditGroup extends Component {
  componentDidMount = () => {
    this.props.loadIcons();
    this.props.getSingle({ groupId: this.props.router.query.id });
  };
  componentWillUnmount = () => {
    this.props.resetData('chosenIcon');
  }
  render() {
    const { router, group } = this.props;
    const { handleChange, values, errors, setFieldValue, icon } = this.props;
    const name = get(group, 'name');
    return (
      <Form>
        <SecondPanel
          title="Edit Group"
          breadCrumb="Manage Groups / Edit group"
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
          chosenIcon={this.props.icon}
          group={group}
          errors={errors}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          values={values}
        />
      </Form>
    );
  }
}
