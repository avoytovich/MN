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
      return resp;
    }
  });

export const deleteQuestion = params => 
dispatchSend('delete_question', request.delete('/DeleteQuestion', {params: {
  questionId: params.questionId }}), {
  start_action: START_LOAD,
  receiveAction: DELETE_QUESTION,
  adaptData: resp => {
    return resp;
  }
});

export async function getNewQuestions() {
  try {
    const { data } = await request.get('/NewQuestionsCount')
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function getAllQuestions() {
  try {
    const { data } = await request.get('/AllQuestions')
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function getGroupQuestions(params) {
  try {
    const { data } = await request.get('/GetQuestions', {params})
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function answerQuestion(payload) {
  try {
    const { data } = await request.post('/AnswerQuestion', payload);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function editAnswer(payload) {
  try {
    const { data } = await request.post('/EditAnswer', payload);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function deleteAnswer(params) {
  try {
    const { data } = await request.delete('/DeleteAnswer', {params});
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}





