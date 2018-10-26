import React, { Component, Fragment } from 'react';
import {
  ListItem,
  List,
  Typography,
  Button,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Icon,
  withStyles
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Trash from '@material-ui/icons/Delete';
const styles = theme => ({});

@withStyles(styles)
export default class Subgroups extends Component {
  render() {
    const { classes, formik } = this.props;
    console.log(formik);
    return (
      <Fragment>
        <input
          onChange={formik.handleChange}
          name="groups[]['num']['name']"
          value="adsad"
        />
        <input
          onChange={formik.handleChange}
          name="groups[]['num']['description']"
          value="awddwadw"
        />
        <List>
          <ListItem>
            <ListItemText>
              <Typography>1st floor Team</Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton>
                <Trash />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography>Remote workers team</Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton>
                <Trash />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Fragment>
    );
  }
}
