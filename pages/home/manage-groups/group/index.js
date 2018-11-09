import { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import { Button } from '@material-ui/core';
import Underheader from 'components/underheader';

@withRouter
export class Group extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <Underheader/>
        </Layout>
      </Fragment>
    );
  }
}

export default Group;
