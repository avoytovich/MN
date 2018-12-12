import { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import SecondPanel from 'components/secondpanel';
import { Button } from '@material-ui/core';

@withRouter
export class Underheader extends Component {
  titleCase = str => {
    if (str.search('-') !== -1) {
      const splitStr = str.split('-');
      splitStr.forEach((item, index) => {
        splitStr[index] =
          splitStr[index].charAt(0).toUpperCase() +
          splitStr[index].substring(1);
      });
      return splitStr.join(' ');
    }
    const splitStr = str.toLowerCase().split(' ');
    splitStr.forEach((item, index) => {
      splitStr[index] =
        splitStr[index].charAt(0).toUpperCase() + splitStr[index].substring(1);
    });
    return splitStr.join(' ');
  };

  titlePath = str => {
    const splitStr = str.toLowerCase().split('/');
    const path = splitStr[splitStr.length - 2].replace('-', ' ');
    return path.charAt(0).toUpperCase() + path.substring(1);
  };

  render() {
    const {
      query: { name },
      pathname
    } = this.props.router;
    const { customStyle } = this.props;
    return (
      <div className={customStyle || ''}>
        <SecondPanel
          actionButtons={[
            <Button variant="outlined" color="secondary">
              {' '}
              INVITE
            </Button>
          ]}
          centerButtons={[
            <Button
              variant="contained"
              color="primary"
              className="custom-button-material">
              ? Start A QUIZ
            </Button>
          ]}
          breadCrumb={`${this.titlePath(pathname)} / ${this.titleCase(name)}`}
          title="Group Content"
        />
      </div>
    );
  }
}

export default Underheader;
