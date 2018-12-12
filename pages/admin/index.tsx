import * as React from 'react';
import { Grid, Button } from '@material-ui/core';
import Layout from 'components/MyLayout';
import Secondpanel from 'components/secondpanel';
import { connect } from 'react-redux';
import SearchMemberForm from 'components/SearchMemberForm';
import Table from 'components/Table';
import { getInvites } from '../../actions/invites';

const data = [
  {
    email: 'sss@gmail.com',
    status: 'active'
  },
  {
    email: 'sss@gmail.com',
    status: 'active'
  },
  {
    email: 'sss@gmail.com',
    status: 'active'
  },
  {
    email: 'sss@gmail.com',
    status: 'active'
  }
];

class AdminPanel extends React.Component {
  componentDidMount = async () => {
    this.props.getInvites();
  };

  accept = id => () => {
    console.log('accept');
  };

  reject = id => () => {
    console.log('reject');
  };

  remove = id => () => {
    console.log('remove');
  };

  render() {
    const keys = [
      {
        id: 'email',
        sort: true,
        numeric: false,
        label: 'Email'
      },
      {
        id: 'status',
        sort: true,
        numeric: false,
        label: 'Status'
      },
      {
        param: 'id',
        action: true,
        label: 'Accept',
        actionButton: (
          <Button variant="outlined" color="secondary">
            Accept
          </Button>
        ),
        callback: this.accept
      },
      {
        param: 'id',
        action: true,
        label: 'Delete',
        actionButton: (
          <Button variant="contained" color="warning">
            Remove
          </Button>
        ),
        callback: this.remove
      }
    ];

    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <Secondpanel title="Admin Panel" breadCrumb="" />
            <SearchMemberForm search="" />
            <Table data={data} paging={false} keys={keys} />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  null,
  { getInvites }
)(AdminPanel);
