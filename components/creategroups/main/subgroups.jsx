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

export default class Subgroups extends Component {
  state = {
    subgroups: [],
    val: ''
  };

  addSubgroup = () => {
    this.setState({
      subgroups: this.state.subgroups.push(this.state.val),
      val: ''
    })
  }
  handleChange = e => this.setState({val: e.target.value})

  render() {
    const { classes, formik } = this.props;
    const { subgroups } = this.state;
    return (
      <Fragment>
        <Grid container alignItems="center" spacing={0}>
          <Grid item xs={10}>
            <TextField
              InputProps={{
                className: classes.text
              }}
              // onChange={this.handleChange}
              value={this.state.val}
              InputLabelProps={{
                shrink: true,
                className: classes.label
              }}
              placeholder="New Subgroup name"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.addButton}
              variant="contained"
              color="primary">
              <div className={classes.plusIcon} />
              <Typography className={classes.addText}>add</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            {subgroups.map(el => (
              <input
                onChange={formik.handleChange}
                name="groups[]['num']['name']"
                type="hidden"
              />
            ))}
            <List>
              {subgroups.map((el, key) => (
                <ListItem key={`group-${key}`}>
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
              ))}
            </List>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
