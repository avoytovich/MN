import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import Button from '@material-ui/core/Button';

import { searchGroups } from 'actions/groups'
import { setData } from '../actions/updateData';
import SearchField from '../components/searchpanel/searchfield';
import '../sass/common.sass';
import '../components/searchpanel/searchpanel.sass';
import { resetData, updateSpecData } from 'actions/updateData';
@withRouter
@connect(
  null,
  {
    updateSpecData,
    searchGroups,
    resetData
  }
)
@withFormik({
  mapPropsToValues: () => ({
    name: '',
    memberName: ''
  }),
  async handleSubmit(values, props) {
    if (values.name.length > 0 || values.memberName.length > 0){
      const { name, memberName } = values;
      // TODO: fix
      const data = await props.props.searchGroups({
        name,
        membername: memberName
      });
    }    
  }
})
export default class SearchForm extends React.Component {

  remove = () => {
    this.props.resetData('searchGroups');
  }
  render() {
    const { values } = this.props;

    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="d-flex search-form f-row jcc ai-center">
          <Field
            name="name"
            value={values.name}
            render={
              props => <SearchField
                
                label="Search in Groups"
                onRemove={this.remove}
                {...props} />
            } />
          <Field
            name="memberName"
            value={values.memberName}
            label="Search by Names"
            render={
              props => <SearchField
                label="Search by Names"
                onRemove={this.remove}
                {...props} />
            }
          />
          <Button variant="contained" color="primary" type="submit">
            search
          </Button>
        </div>
      </form>
    );
  }
}
