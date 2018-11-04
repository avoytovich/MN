import React, { Component, Fragment } from 'react';
import {
  ListItem,
  List,
  Typography,
  Button,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  TextField,
  Icon,
  withStyles
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Trash from '@material-ui/icons/Delete';
import _ from 'lodash';
import { connect } from 'react-redux';

import { deleteGroup, editGroup, createGroup } from 'actions/groups';
import find from 'lodash/find';
import { bindActionCreators } from 'redux';
import withModal from 'services/decorators/withModal';
import DeleteModal from './deleteModal';

@connect(
  null,
  {
    editGroup,
    createGroup
  }
)
@withModal(DeleteModal)
export default class Subgroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      isEditing: false,
      editGroup: null,
      editVal: ''
    };
  }

  handleChangeEdit = e => {
    this.setState({
      editVal: e.target.value
    });
  };

  addSubgroup = () => {
    if (!this.state.val.length) return;
    this.props.createGroup({
      name: this.state.val,
      description: '',
      masterGroupId: this.props.id
    });
    this.setState({
      val: ''
    });
  };
  handleChange = e => {
    this.setState({ val: e.target.value });
  };
  editGroup = k => e => {
    if (this.state.isEditing) {
      this.props.editGroup({
        id: this.state.editGroup,
        name: this.state.editVal,
        description: ''
      });
      this.setState({
        isEditing: false,
        editGroup: null,
        editVal: ''
      });
    } else
      this.setState({
        isEditing: true,
        editGroup: k,
        editVal: find(this.props.subgroups, el => el.id === k).name
      });
  };
  deleteGroup = group => e => {
    this.props.deleteGroup(group);
  };
  render() {
    const { classes, id, subgroups, open } = this.props;
    return (
      <Fragment>
        <Grid container alignItems="center" spacing={0}>
          <Grid item xs={10}>
            <TextField
              InputProps={{
                className: classes.text
              }}
              value={this.state.val}
              InputLabelProps={{
                shrink: true,
                className: classes.label
              }}
              onChange={this.handleChange}
              placeholder="New Subgroup name"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.addButton}
              variant="contained"
              onClick={this.addSubgroup}
              color="primary">
              <div className={classes.plusIcon} />
              <Typography className={classes.addText}>add</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.eg}>Existing groups</Typography>
            <List>
              {subgroups.map((el, key) => (
                <ListItem key={`group-${key}`}>
                  {this.state.editGroup === el.id ? (
                    <TextField
                      value={this.state.editVal}
                      fullWidth
                      name="name"
                      style={{
                        width: 'calc(100% - 60px)'
                      }}
                      onChange={this.handleChangeEdit}
                    />
                  ) : (
                    <ListItemText>
                      <Typography>{el.name}</Typography>
                    </ListItemText>
                  )}
                  <ListItemSecondaryAction>
                    <IconButton onClick={this.editGroup(el.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={open}>
                      <Trash />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
