import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form } from 'formik';
import { withRouter } from 'next/router';

import Button from '@material-ui/core/Button';

import { setData } from '../actions/updateData';
import SearchField from '../components/searchpanel/searchfield';
import '../sass/common.scss';
import '../components/searchpanel/searchpanel.scss';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

@withRouter
@connect(
  null,
  mapDispatchToProps
)
@withFormik({
  handleSubmit(values, { setErrors, props }) {
    // props.setData(values, 'testExample');
    // setErrors({
    //   first: 'Тест'
    // });
    // props.router.push('/');
  }
})
export default class SearchForm extends React.Component {
  render() {
    return (
      <Form>
        <div className="d-flex search-form f-row jcc ai-center">
          <SearchField
            name="searchbyName"
            label="Search by name"
            placeholder="Search by Names"
          />
          <Button variant="contained" color="primary" type="submit">
            search
          </Button>
        </div>
      </Form>
    );
  }
}
