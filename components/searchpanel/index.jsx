import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import SearchForm from '../../forms/searchForm';
import './searchpanel.scss';

export default class SearchPanel extends Component {
  render() {
    return (
      <div className="d-flex jcc f-column wrapper gray-background">
        <Typography align="center" variant="title">
          Find People In Your Workspace
        </Typography>
        <SearchForm />
      </div>
    );
  }
}
