import React, { Component, Fragment } from 'react';
import { ListItem, List, Divider, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import GroupInfo from './groupinfo';
import Gallery from './gallery';
import { getGroups } from '../../actions/groups';

import './groups.scss';
import '../../sass/common.scss';

const styles = theme => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    height: 225
  },
  list: {
    minHeight: 700
  }
});

const mapStateToProps = ({ groups }) => ({
  groups: groups.groups
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGroups
    },
    dispatch
  );

@withStyles(styles)
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Groups extends Component {
  componentDidMount = () => {
      this.props.getGroups(
        {
          limit:30,
          offset:0
        });
  };

  render() {
    const { classes, groups } = this.props;

    return (
      <Fragment>
        <List className={classes.list}>
          {groups.map(group => (
            <Fragment key={`group-${group.id}`}>
              <ListItem className={classes.item}>
                <GroupInfo info={group} />
                <Gallery images={group.images} />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Fragment>
    );
  }
}
