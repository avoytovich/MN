import React, { Component } from 'react';

export default function i18n(baseName = '') {
  return function(Child) {
    class Localize extends Component {
      translate = (key, customName, values) => {
        const name = customName || baseName;
        return this.props.intl.formatMessage({ id: `${name}.${key}` }, values);
      };

      render() {
        return <Child {...this.props} translate={this.translate} />;
      }
    }
    return Localize;
  };
}
