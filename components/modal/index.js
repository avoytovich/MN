import React, { Component } from 'react';
import { get } from 'lodash';
import { withRouter } from 'next/router';
import Div100vh from 'react-div-100vh';
import Modal from '@material-ui/core/Modal';
import Close from '@material-ui/icons/Close';

import './modal.sass';

@withRouter
export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmation: false
    };
  }

  close = () => {
    if (this.props.withConfirm) {
      this.setState({ confirmation: true });
    } else {
      this.props.onClose();
    }
  };

  handleParentCancel = () => {
    this.setState({
      confirmation: false
    });
  };

  handleParentOk = () => {
    this.setState({
      confirmation: false
    });
    this.props.onClose();
  };

  render() {
    const { children } = this.props;
    return (
      <Modal open={this.props.open} onClose={this.close}>
        <Div100vh>
          <div className="modal-window">
            {this.props.withClose && !this.state.confirmation && (
              <div className="close-wrapper">
                <Close onClick={this.close} />
              </div>
            )}
            {children}
          </div>
        </Div100vh>
      </Modal>
    );
  }
}
