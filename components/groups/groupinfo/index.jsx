import React, { Component } from 'react';
import { Typography, Divider, withStyles, Avatar } from '@material-ui/core';
import moment from 'moment';
import Link from 'next/link';
import { connect } from 'react-redux';
import { deleteGroup } from 'actions/groups';
import { Link as TheLink } from '../../../routes';
import '../../../sass/common.scss';
import './groupinfo.scss';

const replaceUrl = (word) => {
  word = word.replace(/\s/g, '-');
  word = word.toLowerCase();
  return word;
}

const styles = theme => ({
  lupdate: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: 600,
    color: '#b6bec9'
  },
  mcount: {
    fontSize: 18,
    fontWeight: 600,
    color: '#5e6a78',
    marginTop: 14,
    lineHeight: 'normal'
  },
  avatar: {
    width: 80,
    height: 80,
    
  }
});

@withStyles(styles)
@connect(
  null,
  {
    deleteGroup
  }
)
export default class GroupInfo extends Component {

  titleCase = str => str.toLowerCase().split(' ').join('-');

  render() {
    const {
      classes,
      info,
      info: { id, name },
    } = this.props;
    return (
      <div className="d-flex f-row group-info-wrapper">
        <Avatar className={classes.avatar} src={info.icon || '/static/png/icon-group.png'}/>
        <div className="group-icon" />
        <div className="d-flex f-column margin-info">
          <Link
            href={{ pathname: '/home/manage-groups/group', query: { id, name } }}
            as={`/home/manage-groups/group/${this.titleCase(name)}`}
          >
            <a style={{margin: 0}}>
              <Typography
                className="group-name"
                variant="subheading"
              >
                {info.name}
              </Typography>
            </a>
          </Link>
          <Typography className={classes.mcount}>
            {info.membersCount} members
          </Typography>
          <Typography className={classes.lupdate}>
            Last update{' '}
            {moment(info.dateOfLastUpdate).format('DD/MM/YYYY h:mm a')}
          </Typography>
          <div className="actions-block d-flex jcc ai-center">
            <div className="d-flex edit ai-center">
              <div className="icon" />
              <TheLink
                route="editgroup" params={{
                  id: info.id
                }}
                >
                <a >
                  <Typography className="edit-text" variant="caption">
                    edit
                  </Typography>
                </a>
              </TheLink>
            </div>
            <div className="divider" />
            <div
              onClick={() => this.props.deleteGroup(info)}
              className="move d-flex ai-center">
              <div className="icon" />
              <Typography className="move-text" variant="caption">
                remove
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
