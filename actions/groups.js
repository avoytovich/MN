import Axios from 'axios';
import dispatchSend from '../services/dispatchSend';
import {
  START_LOAD,
  GET_GROUPS,
  ADD_GROUP,
  GET_SINGLE,
  EDIT_GROUP,
  DELETE_GROUP,
  SET_MODAL_DELETE,
  SEARCH_GROUPS,
  UPDATE_SPEC_DATA,
  SET_RUNTIME_VARIABLE,
  END_LOAD
} from '../constants/actions';

import { GROUP_URL } from '../constants/api';
import { getAxiosInstance } from '../shared/request';

const request = getAxiosInstance('/api/Group');
const quizRequest = getAxiosInstance('/api/Quiz');

export const getGroups = params =>
  dispatchSend('get_groups', request.get('/GetGroups', { params }), {
    start_action: START_LOAD,
    receiveAction: GET_GROUPS,
    adaptData: resp => resp,
    adaptError: e => 'Error load'
  });

export const getSingle = params =>
  dispatchSend('get_group', request.get('/GetGroupDetails', { params }), {
    adaptData: r => r,
    receiveAction: ADD_GROUP
  });

export const createGroup = data =>
  dispatchSend('create_group', request.put('/CreateGroup', data), {
    start_action: START_LOAD,
    receiveAction: ADD_GROUP,
    adaptData: resp => resp
  });

export const editGroup = data =>
  dispatchSend('edit_group', request.post('/EditGroup', data), {
    receiveAction: EDIT_GROUP,
    adaptData: resp => resp,
    adaptError: err => {
      console.log(err.response);
      if (err.response) return err.response.data.errors[0].message;
      return 'Error';
    }
  });

export const deleteGroup = params =>
  dispatchSend(
    'delete_group',
    request.delete('DeleteGroup', { params: { id: params.id } }),
    {
      receiveAction: DELETE_GROUP,
      adaptData: resp => params
    }
  );

export const setModalDeleteGroup = group => dispatch =>
  dispatch({
    type: SET_MODAL_DELETE,
    data: group
  });

export const searchGroups = params =>
  dispatchSend('searchGroups', request.get('/GroupSearch', { params }), {
    receiveAction: UPDATE_SPEC_DATA,
    adaptData: r => r,
    adaptError: err => {
      if (err.response) return err.response.data.errors[0].message;
      return 'Error search';
    }
  });

export const loadIcons = () =>
  dispatchSend('loadIcons', request.get('/GetGroupIcons'), {
    receiveAction: UPDATE_SPEC_DATA,
    adaptData: r => r,
    adaptError: err => {
      if (err.response) return err.response.data.errors[0].message;
      return 'Error load icons';
    }
  });
export const loadQuiz = params =>
  dispatchSend('quiz', quizRequest.get('/GetQuiz', { params }), {
    receiveAction: UPDATE_SPEC_DATA,
    adaptData: r => r,
    adaptError: err => {
      if (err.response) return err.response.data.errors[0].message;
      return 'Error load quiz';
    }
  });

export const moveOnQuiz = () => (dispatch, getState) => {
  const currentQuiz = getState().runtime.currentQuizData;
  currentQuiz.current += 1;
  dispatch({
    type: UPDATE_SPEC_DATA,
    data: currentQuiz,
    name: 'currentQuiz'
  });
};
export const sendResults = results =>
  dispatchSend('send_results', quizRequest.post('/SaveQuizResult', results), {
    receiveAction: END_LOAD,
    adaptData: r => r,
    adaptError: err => {
      if (err.response) return err.response.data.errors[0].message;
      return 'Error load quiz';
    }
  });
