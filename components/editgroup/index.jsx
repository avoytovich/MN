import { Component } from 'react';
import Main from './main';
import { Form, withFormik } from 'formik';
import SecondPanel from '../secondpanel';
import { Button, NoSsr } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { editGroup, getSingle } from '../../actions/groups';
import { createQuestions } from 'actions/questions';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Link from 'next/link';
import { withRouter } from 'next/router';
import find from 'lodash/find';
import get from 'lodash/get';
import NoSSR from '@material-ui/core/NoSsr'
import { loadIcons } from 'actions/groups';
import { resetData } from 'actions/updateData';

const mapStateToProps = ({ groups, questions, runtime }, { router }) => ({
  group: find(groups.groups, g => g.id === parseInt(router.query.id, 10)),
  icon: runtime.chosenIconData
});

@withRouter
@connect(
  mapStateToProps,
  { editGroup, getSingle, createQuestions,
    loadIcons, resetData
  }
)
@withFormik({
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
      name,
      description: desc,
      id
    };
  },
  handleSubmit: async (values, { props }) => {
    const iconId = get(props, 'icon.id');
    await props.editGroup({ name: values.name, 
      description: values.description,
       id: values.id,
       iconId: iconId
      })
    await props.createQuestions({
      groupId: values.id,
      text: values.questions
    })
    props.router.push('/home/manage-groups');
  }
})
export default class EditGroup extends Component {
  componentDidMount = () => {
    this.props.loadIcons();
  };
  componentWillUnmount = () =>
  {
    this.props.resetData('chosenIcon');
  }
  render() {
    const { router, group } = this.props;
    return (
      <Form>
        <SecondPanel
          title="Edit Group"
          breadCrumb="Home / Edit a Group"
          actionButtons={[
            <Link href="/home/manage-groups">
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
          formik={this.props} group={group} />
      </Form>
    );
  }
}
