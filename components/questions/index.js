import { Component, Fragment } from 'react';
import { Grid, List, ListItem, ListItemText, Badge, Divider, Typography } from '@material-ui/core';
import { withRouter } from 'next/router';
import { Link } from '../../routes';
import { connect } from 'react-redux';

import "./style.sass";

@connect(
  null
)
@withRouter
export default class Questions extends Component {

  render() {
    const groups = this.props.groups.map(group => {
      const listItemText = group.newQuestionsCount
        ? (
          <Badge
            badgeContent={group.newQuestionsCount}
            color="error"
          >
            <ListItemText primary={group.name} />
          </Badge>
        )
        : <ListItemText primary={group.name} />

      return (
        <Link route="group-questions" key={group.groupId} params={{groupId: group.groupId}}>
          <ListItem className="questions-item" button >
            {listItemText}
          </ListItem>
        </Link>
      )
    })
    return (
      <Fragment>
          <Grid className="questions-wrapper" container >
            <div className="questions-container">
              <Typography className="questions-title">Group Questions</Typography>
            <List component="div" className="questions-list" disablePadding>
              {groups.length ? groups : 'There are no questions now'}
            </List>
            </div>
          </Grid>
      </Fragment>
    );
  }
}
