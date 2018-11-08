import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import Button from '@material-ui/core/Button';

import { searchGroups } from 'actions/groups'
import { setData } from '../actions/updateData';
import SearchField from '../components/searchpanel/searchfield';
import '../sass/common.scss';
import '../components/searchpanel/searchpanel.scss';

@withRouter
@connect(
  null,
  {
    searchGroups
  }
)
@withFormik({
  async handleSubmit(values, props) {
    const response = await props.props.searchGroups(values);
    return response;    
  }
})
export default class SearchForm extends React.Component {
  render() {
    console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="d-flex search-form f-row jcc ai-center">
          <Field
           name="name"
           label="Search by name"
           component={SearchField} />
           <Field
            name="memberName"
            label="Search by Names"
            component={SearchField} />
          <Button variant="contained" color="primary" type="submit">
            search
          </Button>
        </div>
      </form>
    );
  }
}
