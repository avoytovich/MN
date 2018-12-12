import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent } from '@material-ui/core';

import { toggleSnackbar } from '../../actions/snackbar';

function mapStateToProps(state) {
  return {
    snackbar: state.snackbar.snackbar
  };
}

@connect(
  mapStateToProps,
  { toggleSnackbar }
)
export default class GlobalSnackbar extends Component {
  render() {
    const { snackbar } = this.props;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => this.props.toggleSnackbar(null, null, false)}>
        <SnackbarContent
          message={snackbar.message}
          style={{ justifyContent: 'center', backgroundColor: snackbar.color }}
        />
      </Snackbar>
    );
  }
}
