import React, { Component, Fragment } from 'react';
import { ListItem, List, Divider, withStyles, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import GroupInfo from './groupinfo';
import Gallery from './gallery';
import { getGroups } from '../../actions/groups';
import map from 'lodash/map';
import InfiniteScroll from 'react-infinite-scroller';
import { searchGroups } from 'actions/groups'
import { resetData, updateSpecData } from 'actions/updateData';

import '../../sass/common.sass';

const styles = theme => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 225,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: '1px solid rgba(0,0,0,0.2)'
  },
  list: {
    minHeight: 700
  },
  loader: {
    color: '#224483',
    display: 'block',
    position: 'relative',
    margin: '0 auto'
  }
});

const mapStateToProps = ({ groups, runtime }) => {
  const search = !!runtime.searchGroupsData ? map(runtime.searchGroupsData) : undefined;
  return {
    groups: search ? search : groups.groups,
    isSearching: !!search
  }
};


@withStyles(styles)
@connect(
  mapStateToProps,
  { getGroups, searchGroups }
)
export default class Groups extends Component {
  groups = 5;
  state = {
    hasMore: true
  }
  loadMore = (param) => {
    if(this.props.isSearching)
      this.setState({
        hasMore: false
      })
    
    this.props.getGroups({
      limit: this.groups,
      offset: (param - 1) * this.groups
    }).then(r => {
      if (r.pagination.next_offset >= r.pagination.total_count)
        this.setState({
          hasMore: false
        })
    })
  }
  render() {
    const { classes, groups = [], isSearching } = this.props;
    // const page = groups.length / this.groups;
    return (
        <List className={classes.list}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            loader={<CircularProgress key={'cp'} className={classes.loader}/>}
          >
            {groups.map(group => (
              <ListItem key={`group-infinite-${group.id}`} className={classes.item}>
                <GroupInfo info={group} />
                {/* TODO setup images */}
                <Gallery images={group.images === undefined ? [] : group.images} />
              </ListItem>
            ))}
          </InfiniteScroll>
        </List>
    );
  }
}
