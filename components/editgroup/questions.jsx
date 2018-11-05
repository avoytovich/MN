import React, { Component, Fragment, SyntheticEvent, FormEvent } from 'react';
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
import { withRouter } from 'next/router';
import { getQuestions } from 'actions/questions';

const mapStateToProps = ({ questions }, { router }) => ({
  questions: _.filter(
    questions.questions,
    q => q.groupId === parseInt(router.query.id, 10)
  )
});

@withRouter
@connect(
  mapStateToProps,
  {
    getQuestions
  }
)
export default class Questions extends Component {
  componentDidMount = () => {
    console.log(this.props);
    this.props.getQuestions({ groupId: this.props.router.query.id });
  };
  state = {
    subgroups: [],
    val: ''
  };

  addSubgroup = () => {
    if (!this.state.val.length) return;
    const newGroups = [...this.state.subgroups, this.state.val];
    this.props.formik.setFieldValue('questions', newGroups);
    this.setState({
      subgroups: newGroups,
      val: ''
    });
  };
  handleChange = e => {
    this.setState({ val: e.currentTarget.value });
  };
  editGroup = k => e => {
    this.setState({
      val: this.state.subgroups[k],
      subgroups: _.filter(this.state.subgroups, (sg, key) => key !== k)
    });
  };
  deleteGroup = k => e => {
    const newGroups = _.filter(this.state.subgroups, (sg, key) => key !== k);
    this.props.formik.setFieldValue('questions', newGroups);
    this.setState({
      subgroups: newGroups
    });
  };
  render() {
    const { classes, questions = [] } = this.props;
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
              placeholder="Your question"
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
            {questions.length > 0 ? (
              <Typography className={classes.eg}>Existing questions</Typography>
            ) : null}
            <List>
              {questions.map((el, key) => (
                <ListItem key={`question-${key}`}>
                  <ListItemText>
                    <Typography>{el.question}</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={this.deleteGroup(key)}>
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
