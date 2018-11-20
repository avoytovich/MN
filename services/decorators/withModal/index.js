import React, { Component, Fragment } from 'react';

import Modal from '@material-ui/core/Modal';
import Close from '@material-ui/icons/Close';

import './withModal.scss';

export default function withModal(ComponentModal, options = {}) {
  return function(Child) {
    class CustomModal extends Component {
      state = {
        open: false
      };
      handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      render() {
        return (
          <Fragment>
            <Modal  open={this.state.open} onClose={this.handleClose}>
              <div className="modal-window">
                {options.withClose && (
                  <div className="close-wrapper">
                    <Close onClick={this.handleClose} />
                  </div>
                )}
                <ComponentModal  close={this.handleClose} />
              </div>
            </Modal>
            <Child
              {...this.props}
              translate={this.translate}
              
              open={this.handleOpen}
              close={this.handleClose}
            />
          </Fragment>
        );
      }
    }
    return CustomModal;
  };
}
