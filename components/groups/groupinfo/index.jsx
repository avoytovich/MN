import React, { Component } from 'react';
import { Typography, Divider, withStyles } from '@material-ui/core';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux'
import { deleteGroup } from 'actions/groups';

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
  }
});

@withStyles(styles)
@connect(null, {
  deleteGroup
})
export default class GroupInfo extends Component {
  render() {
    const { classes, info } = this.props;
    return (
      <div className="d-flex f-row">
        <div className="group-icon" />
        <div className="d-flex f-column margin-info">
          <Typography variant="subheading">{info.name}</Typography>
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
              <Link
                href={{ pathname: '/editgroup', query: { id: info.id } }}
                // as={`/editgroup/${replaceUrl(info.name)}`}
                >
                <a>
                  <Typography className="edit-text" variant="caption">
                    edit
                  </Typography>
                </a>
              </Link>
            </div>
            <div className="divider" />
            <div onClick={() => this.props.deleteGroup(info)} className="move d-flex ai-center">
              <div className="icon" />
              <Typography  className="move-text" variant="caption">
                move
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
