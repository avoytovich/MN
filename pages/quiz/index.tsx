import * as React from 'react';
import {
  withRouter,
  WithRouterProps,
  SingletonRouter,
} from 'next/router';
import { Link } from '../../routes';
import { Grid, Button, NoSsr } from '@material-ui/core';
import Layout from 'components/MyLayout';
import SecondPanel from 'components/secondpanel';
import QuizShow from 'components/quiz';
import QuizProgress from 'components/QuizProgress';

type ThreeStringProps = Record<'id', number>

interface Props {
  router: SingletonRouter<ThreeStringProps>
}

class Quiz extends React.Component<Props> {
  render() {
    const query = this.props.router.query as ThreeStringProps;
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <Layout>
            <SecondPanel
              title="Quiz"
              breadCrumb="Manage-Groups / Group / Quiz"
              centerButtons={[
                <QuizProgress
                key={'quiz-progress'}/>
              ]}
              actionButtons={[
                <Link route="group" params={{ id: query.id }} key={'buttonone'}>
                  <a>
                    <Button variant="outlined" color="primary">
                      Back
                    </Button>
                  </a>
                </Link>
              ]}
            />
            <QuizShow 
                groupId={query.id}
            />
          </Layout>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Quiz);