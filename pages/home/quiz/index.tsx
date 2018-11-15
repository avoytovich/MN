import * as React from 'react';
import {
  withRouter,
  WithRouterProps,
} from 'next/router';
import Link from 'next/link';
import { Grid, Button } from '@material-ui/core';
import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import Footer from 'components/footer';
import QuizShow from 'components/quiz';

@withRouter
export default class Quiz extends React.Component<WithRouterProps> {
  render() {
    const groupId: number = this.props.router.query.id;

    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Quiz"
              breadCrumb="Home / Quiz"
              actionButtons={[
                <Link href="/home/manage-groups" key={'buttonone'}>
                  <a>
                    <Button variant="outlined" color="primary">
                      Back
                    </Button>
                  </a>
                </Link>
              ]}
            /> 
             <QuizShow 
                groupId={groupId}
            />
            <Footer />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}
