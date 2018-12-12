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
import { getQuestions, deleteQuestion } from 'actions/questions';

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
    getQuestions,
    deleteQuestion
  }
)
export default class Questions extends Component {
  componentDidMount = () => {
    this.props.getQuestions({ groupId: this.props.router.query.id });
  };

  state = {
    questions: [],
    val: ''
  };

  addSubgroup = () => {
    if (!this.state.val.length) return;
    const newQuestions = [...this.state.questions, this.state.val];
    this.props.setFieldValue('questions', newQuestions);
    this.setState({
      questions: newQuestions,
      val: ''
    });
  };

  handleChange = e => {
    this.setState({ val: e.currentTarget.value });
  };

  deleteQuestionState = k => e => {
    const st = this.state.questions.filter((el, key) => key !== k);
    this.props.setFieldValue('questions', st);
    this.setState({
      questions: st
    });
  };

  deleteQuestion = k => e => {
    this.props.deleteQuestion(k);
  };

  render() {
    const { classes, questions = [] } = this.props;
    const newQuestions = this.state.questions;
    return (
      <>
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
              {newQuestions.map((el, key) => (
                <ListItem key={`question-${key}`}>
                  <ListItemText>
                    <Typography>{el}</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={this.deleteQuestionState(key)}>
                      <Trash />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              {questions.map((el, key) => (
                <ListItem key={`question-${key}`}>
                  <ListItemText>
                    <Typography>{el.question}</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={this.deleteQuestion(el)}>
                      <Trash />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </>
    );
  }
}
