import React, { Component, Fragment } from 'react';

import Modal from '@material-ui/core/Modal';
import Close from '@material-ui/icons/Close';

import './withModal.sass';

export default function withModal(ComponentModal, options = {}) {
  return function (Child) {
    class CustomModal extends Component {
      state = {
        open: false,
        data: null
      };
      handleOpen = (data) => {
        this.setState({ open: true, data: data });
      };
      handleClose = () => {
        this.setState({ open: false, data: null });
      };
      render() {
        return (
          <Fragment>
            <Modal style={{zIndex: 13000}} open={this.state.open} onClose={options.withCloseOutside?this.handleClose: null}>
              {
                options.disableStyles ?
                  <>
                    {options.withClose && (
                      <div className="close-wrapper">
                        <Close onClick={this.handleClose} />
                      </div>
                    )}
                    <ComponentModal
                      modalProps={this.state.data}
                      close={this.handleClose} />
                  </> :
                  <div className="modal-window">
                {options.withClose && (
                      <div className="close-wrapper">
                        <Close onClick={this.handleClose} />
                      </div>
                    )}
                    <ComponentModal
                      modalProps={this.state.data}
                      close={this.handleClose} />
                  </div>
              }

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
