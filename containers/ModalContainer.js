import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import { changeQuery } from '../services/serverService';
import Modal from '../components/modal/index';
import SignUpModal from '../components/landing/signUpModal';
import VerifyModal from '../components/modals/verify/modal';
import { Router } from '../routes';

@withRouter
export default class ModalContainer extends React.Component {
  state = {
    signUp: false,
    verify: false,
    title: null,
    modalNames: [
      'signUp',
      'verify',
    ],
  };

  async componentWillReceiveProps(nextProps, nextState) {
    if (this.props.router.query.modal !== nextProps.router.query.modal)
      await this.setOpenModal(nextProps.router.query.modal);
  }

  setOpenModal = async modalName => {
    this.setState(() => {
      const needToCloseArray = this.state.modalNames.filter(
        name => name !== modalName,
      );

      const newState = { [modalName]: true };

      needToCloseArray.forEach(modal => {
        newState[modal] = false;
      });
      return newState;
    });
  };

  onClose = () => {
    const newUrl = changeQuery(this.props.router, ['modal']);
    Router.pushRoute(newUrl);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        {this.state.title && (
          <Head>
            <title>{this.state.title}</title>
          </Head>
        )}
        <Modal open={this.state.signUp} withClose onClose={this.onClose}>
          <SignUpModal onClose={this.onClose} />
        </Modal>
        <Modal open={this.state.verify} withClose onClose={this.onClose}>
          <VerifyModal onClose={this.onClose} />
        </Modal>
      </React.Fragment>
    );
  }
}
