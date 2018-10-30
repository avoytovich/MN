import { Component, Fragment } from 'react';
import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import { Button } from '@material-ui/core';
import GroupInfo from 'components/group';

export class Group extends Component {
  render() {
    return (
      <Fragment>
        <Layout />
        <SecondPanel
          actionButtons={[
            <Button variant="outlined" color="secondary"> INVITE
            </Button>
          ]}
          centerButtons={[
            <Button variant="contained" color="primary">
              ? Start A QUIZ
            </Button>
          ]}
          breadCrumb="Manage groups / Accounting Department"
          title="Group Content"
        />
        <GroupInfo.default

        />
      </Fragment>
    );
  }
}

export default Group;
