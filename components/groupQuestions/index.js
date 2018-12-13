import { Component, Fragment } from 'react';
import {
  Grid,
  IconButton,
  Typography,
  InputAdornment,
  TextField
} from '@material-ui/core';

import { withRouter } from 'next/router';
import { Link } from '../../routes';
import { connect } from 'react-redux';
import Trash from '@material-ui/icons/Delete';
import Redo from '@material-ui/icons/Redo';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';

import "./style.sass";
import { getAllQuestions, answerQuestion, editAnswer, deleteAnswer } from 'actions/questions';
import { toggleSnackbar } from 'actions/snackbar';

@connect(
  null,
  { toggleSnackbar }
)
@withRouter
export default class Questions extends Component {
  state = {
    newQuestions: [],
    answered:[],
    memberId:'',
    value: '',
    tempQuestion: {
      list:'',
      name:'',
      value:''
    }
  };

  async componentDidMount(){
    const { groupId } = this.props.router.query
    try{
      const data = await getAllQuestions()
      const groupIndex = data.findIndex( group => group.groupId === +groupId)
      const { newQuestions, answered, memberId } = data[groupIndex]
      this.setState({ newQuestions, answered, memberId })
    } catch(e) {
      const  { message } = e.response.data.errors[0]
      this.props.toggleSnackbar(message, 'error')
    }
  }

  edit = (e, value, name , list) => {
    this.setState({
      value,
      tempQuestion:{
        list,
        name,
        value
      }
    })
  }

  skip = index => {
    const newQuestions = [...this.state.newQuestions]
    const selectedQuestion = newQuestions.splice(index, 1)
    newQuestions.push(selectedQuestion[0])
    this.setState({ newQuestions })
  }

  handleChange = (e) =>{
    const { value } = e.target
    this.setState({ value })
  }

  save = async (list, index, questionId, isAnswered) =>{
    const { memberId, value } = this.state
    const newQuestion = {
      ...this.state[list][index],
      answer: value
    }

    if(isAnswered){
      const questions = [...this.state[list] ]
      questions[index] = newQuestion
      this.setState({
        [list]:questions,
        tempQuestion:{}
      })
      try{
        await editAnswer({
          memberId,
          questionId,
          text:value
        })
      } catch(e) {
        const  { message } = e.response.data.errors[0]
        this.props.toggleSnackbar(message, 'error')
      }
    } else {
      const newQuestions = [...this.state.newQuestions]
      const answered = [...this.state.answered]
      newQuestions.splice(index, 1)
      answered.push(newQuestion)
      this.setState({ newQuestions, answered, tempQuestion:{} })
      try{
        await answerQuestion({
          memberId,
          questionId,
          text:value
        })
      } catch(e) {
        const  { message } = e.response.data.errors[0]
        this.props.toggleSnackbar(message, 'error')
      }

    }
  }

  delete = async (index, questionId) => {
    const newQuestion = {
      ...this.state.answered[index],
      answer: ''
    }
    const answered = [...this.state.answered]
    const newQuestions = [...this.state.newQuestions]
    answered.splice(index, 1)
    newQuestions.push(newQuestion)
    this.setState({ newQuestions, answered, tempQuestion: {} })
    try {
      await deleteAnswer({ questionId })
    } catch(e) {
      const  { message } = e.response.data.errors[0]
      this.props.toggleSnackbar(message, 'error')
    }
  }


  render() {
    const { tempQuestion, value } = this.state
    const getList = type => {
      const isAnswered = ( type === 'answered' )
      return this.state[type].map((questionInfo, index) => {
        const { question, questionId, answer }  = questionInfo
        const isActive = ( tempQuestion.name !== questionId )
        return (
          <TextField
            InputLabelProps={{className:"group-questions-label"}}
            onChange={(e) => this.handleChange(e)}
            onFocus={(e) => {console.log(e)}}
            key={questionId}
            className={''}
            label={question}
            value={
              !isActive
              ? value
              : (answer || '')
            }
            name={`${questionId}`}
            disabled = {isActive}
            InputProps={{
              endAdornment: isActive
                ? (
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      onClick={(e) => this.edit(e, answer, questionId, type)}
                    >
                      <Edit />
                    </IconButton>
                    {
                      isAnswered
                      ? (
                          <IconButton
                            onClick={() => this.delete(index, questionId)}
                          >
                            <Trash/>
                          </IconButton>
                      )
                      : (
                        <IconButton
                          onClick={() => this.skip(index)}
                        >
                          <Redo />
                        </IconButton>
                      )
                    }
                  </InputAdornment>
                )
                :  (
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      onClick={() => this.save(type, index, questionId, isAnswered)}
                    >
                      <Save />
                    </IconButton>
                  </InputAdornment>
                )
              ,
              disableUnderline: isActive
            }}
          />
        )
      })
    }

    const answered = getList('answered')
    const newQuestions = getList('newQuestions')

    return (
      <Fragment>
        <Grid className="group-questions-wrapper" container direction="column" wrap="wrap">
          <div className="group-questions-container">
            <Typography className="group-questions-title">New Questions</Typography>
            {newQuestions.length ? newQuestions : "There is no new questions"}
          </div>
          <div className="group-questions-container">
            <Typography className="group-questions-title">Previous Questions</Typography>
              {answered.length ? answered : "There is no answered questions"}
          </div>
        </Grid>
      </Fragment>
    );
  }
}
