import React, { Component } from 'react';
import { Typography, IconButton, Collapse } from '@material-ui/core';
import ArrowIcon from '@material-ui/icons/KeyboardArrowUp'

import SearchForm from '../../forms/searchForm';
import './searchpanel.sass';

export default class SearchPanel extends Component {
  state = {
    open: true
  }

  render() {
    const { open } = this.state
    return (
      <div className="d-flex jcc f-column wrapper gray-background search-panel-container">
        <IconButton
          className="search-panel-open"
          onClick = { () => { this.setState({open: !open}) }}
          style = {{   transform : !open ? 'rotate3d(1, 0, 0, 180deg)' : 'rotate3d(1, 0, 0, 0)' }}
        >
          <ArrowIcon/>
        </IconButton>
        <Typography className="search-panel-title"  align="center" variant="title">
          Find People In Your Workspace
        </Typography>
        <Collapse in={open}>
          <SearchForm />
        </Collapse>
      </div>
    );
  }
}