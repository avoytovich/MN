import React, { Component } from 'react';
import { Typography, Divider, withStyles, List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import moment from 'moment';
import Link from 'next/link';
import { Link as TheLink } from '../../../routes';
import '../../../sass/common.scss';
import './groupinfo.scss';
import withModal from 'services/decorators/withModal/index';
import { connect } from 'react-redux'
import { updateSpecData } from 'actions/updateData';

import GroupDeleteModal from './groupModal';

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
    borderRadius: 0,
    marginTop: 15,
    width: 80,
    height: 80,
  },
  subgroupText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  subgroupList: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 88,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

@withModal(GroupDeleteModal)
@withStyles(styles)
@connect(null, {
  updateSpecData
})
export default class GroupInfo extends Component {

  titleCase = str => str.toLowerCase().split(' ').join('-');
  handleDelete = group => () => {
    this.props.updateSpecData('deleteGroup', group);
    this.props.open(true);
  }
  render() {
    const {
      classes,
      info,
      info: { id },
    } = this.props;
    return <div className="d-flex f-row group-info-wrapper">
        <Avatar className={classes.avatar} src={info.icon || '/static/png/icon-group.png'} />
        <div className="group-icon" />
        <div className="d-flex f-column margin-info">
          <Link href={{ pathname: '/manage-groups/group', query: { id } }} as={`/manage-groups/group/${id}`}>
            <a style={{ margin: 0 }}>
              <Typography className="group-name" variant="subheading">
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
          <List className={classes.subgroupList}>
            {info.subgroups.map((subgroup, key) => (
              <ListItem
                className={classes.listItem}
                key={`subgroup-${key}`}>
                <ListItemText className={classes.subgroupText}>
                  {subgroup.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        <div className="actions-block d-flex jcc ai-center">
          <TheLink route="editgroup" params={{ id: info.id }}>
            <a>
              <div className="d-flex edit ai-center">
                <div className="icon" />
                <Typography className="edit-text" variant="caption">
                  edit
                  </Typography>
              </div>
            </a>
          </TheLink>
            <div className="divider" />
            <div onClick={this.handleDelete(info)} className="move d-flex ai-center">
              <div className="icon" />
              <Typography className="move-text" variant="caption">
                remove
              </Typography>
            </div>
          </div>
        </div>
      </div>;
  }
}
