import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pick, get, merge } from 'lodash';

import { createNotification } from '../notification';

import { updateSpecData, setData } from '../../actions/updateData';

export default function loading(runtimeNames = []) {
  return function(Child) {
    const mapStateToProps = ({ runtime }, props) => {
      const returnObj = {
        loading: runtime.loading || false,
      };
      if (props.runtimeName) {
        returnObj[name] = runtime[`${name}Data`];
      }
      runtimeNames.forEach(name => (returnObj[name] = runtime[`${name}Data`]));
      return returnObj;
    };

    const mapDispatchToProps = dispatch =>
      bindActionCreators({ updateSpecData, setData, dispatch }, dispatch);

    @connect(
      mapStateToProps,
      mapDispatchToProps,
    )
    class Loading extends Component {
      defOptions = {
        showError: false,
        parseError: undefined,
        showSuccess: false,
        withBeTranslate: false,
        unsetLoading: true,
        setData: false,
        mapper: data => data,
      };

      translatedBeErrors = [
        'TO_SMALL_TRANSACTION_FOR_CHARGE',
        'postal_code_invalid',
        'SAME_PASSWORD_ERROR',
        'INVALID_PASSWORD_TYPE',
        'SELECTED_TIMESLOT_NOT_AVAILABLE',
      ];

      loadData = async (promise, opts = {}) => {
        const options = merge({}, this.defOptions, opts);
        this.setLoader(true);
        let data;
        try {
          data = await promise;
          if (options.saveTo) {
            if (options.setData) {
              this.props.setData(
                options.mapper(data.data),
                `${options.saveTo}Data`,
              );
            } else {
              this.props.updateSpecData(
                options.mapper(data.data),
                options.saveTo,
              );
            }
          }
          if (options.showSuccess) {
            createNotification({
              type: 'success',
              title: options.showSuccess,
              message: '',
            });
          }
        } catch (error) {
          let beErrorCode = get(error, 'response.data.errorCode');

          // STRIPE ERROR FROM BE
          if (beErrorCode === 'ERROR_PAYMENT_SYSTEM_PRIVATE_INFO') {
            const stripeError = get(error, 'response.data.params.code');
            stripeError && (beErrorCode = stripeError);
          }
          if (
            options.withBeTranslate &&
            this.translatedBeErrors.indexOf(beErrorCode) !== -1
          ) {
            createNotification({
              type: 'error',
              title: this.props.translate(beErrorCode, 'beErrors'),
              message: ' ',
            });
            this.setLoader(false);
            return Promise.reject(error);
          }
          if (options.showError) {
            createNotification({
              type: 'error',
              title: options.showError,
              message: ' ',
            });
          }
          if (options.parseError) {
            options.parseError(error);
          }
          this.setLoader(false);
          return Promise.reject(error);
        }
        if (options.unsetLoading) this.setLoader(false);
        return Promise.resolve(data);
      };

      setLoader = value => this.props.setData(value, 'loading');

      showMessage = (title, type = 'error') => {
        createNotification({
          type: type,
          title: title,
          message: ' ',
        });
      };

      showSuccess = title => this.showMessage(title, 'success');

      showError = title => this.showMessage(title);

      render() {
        return (
          <Child
            {...this.props}
            loadData={this.loadData}
            setLoader={this.setLoader}
            showSuccess={this.showSuccess}
            showError={this.showError}
            {...pick(this.props, runtimeNames)}
          />
        );
      }
    }
    return Loading;
  };
}
