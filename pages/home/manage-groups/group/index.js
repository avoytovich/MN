import { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import { Button } from '@material-ui/core';
import Underheader from 'components/underheader';

import "./group.sass";

@withRouter
export class Group extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <Underheader customStyle="wrapper"/>
        </Layout>
      </Fragment>
    );
  }
}

export default Group;
