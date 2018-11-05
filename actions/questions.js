import dispatchSend from '../services/dispatchSend';
import { GET_QUESTIONS, START_LOAD, ADD_QUESTIONS, DELETE_QUESTION } from '../constants/actions';
import { getAxiosInstance } from 'shared/request';

const request = getAxiosInstance('/api/Question');


export const getQuestions = (params) =>
  dispatchSend('get_questions',  request.get('/GetQuestions', {params}), {
    start_action: START_LOAD,
    receiveAction: GET_QUESTIONS,
    adaptData: resp => {
      return resp;
    },
    adaptError: e => {
      return "Error load"
    }
  });

export const createQuestions = data =>
  dispatchSend('create_question', request.put('/CreateQuestions', data), {
    start_action: START_LOAD,
    receiveAction: ADD_QUESTIONS,
    adaptData: resp => {
      console.log(resp);
      return resp;
    }
  });

export const deleteQuestion = params => 
dispatchSend('delete_question', request.delete('/DeleteQuestion', {params}), {
  start_action: START_LOAD,
  receiveAction: DELETE_QUESTION,
  adaptData: resp => {
    console.log(resp);
    return resp;
  }
});