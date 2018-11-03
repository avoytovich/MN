import { Component } from 'react';
import Main from './main';
import {  Form,  withFormik } from 'formik';
import SecondPanel from '../secondpanel';
import { Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { editGroup, getSingle } from '../../actions/groups';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Link from 'next/link';
import { withRouter } from 'next/router';
import find from 'lodash/find';
import get from 'lodash/get'

const mapStateToProps = ({ groups }, { router }) => ({
  group: find(groups.groups, g => g.id === parseInt(router.query.id, 10)),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editGroup,
      getSingle
    },
    dispatch
  );


@withRouter
@connect(
  mapStateToProps,
  { editGroup, getSingle }
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
      name: name,
      description: desc,
      id
    };
  },
  
  handleSubmit: (values, { props }) => {
    props.editGroup(values)
      .then(r => {
        props.router.push('/home/manage-groups')
      })
  }
})
export default class EditGroup extends Component {
  componentDidMount = () => {
    // this.props.getSingle({groupId: this.props.router.query.id});
  }
  render() {
    const { router, group } =  this.props;
    console.log(router);
    if(!group) return null; 
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
        <Main formik={this.props} group={group} />
      </Form>
    );
  }
}
