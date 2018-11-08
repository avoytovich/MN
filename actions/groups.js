import dispatchSend from '../services/dispatchSend';
import { START_LOAD, GET_GROUPS, ADD_GROUP, GET_SINGLE, EDIT_GROUP, DELETE_GROUP, SET_MODAL_DELETE } from '../constants/actions';

import { GROUP_URL } from '../constants/api';
import { getAxiosInstance } from '../shared/request';
import Axios from 'axios';

const request = getAxiosInstance('/api/Group');

export const getGroups = (params) =>
  dispatchSend('get_groups',  request.get('/GetGroups', {params}), {
    start_action: START_LOAD,
    receiveAction: GET_GROUPS,
    adaptData: resp => {
      return resp;
    },
    adaptError: e => {
      return "Error load"
    }
  });
export const getSingle = params => 
  dispatchSend('get_group', Axios.all(
  request.get('/GetGroupDetails', {params}),
  request.get('/GetQuestions', {params})
  ),
  {
    adaptData: (r, q) => {
      debugger;
      console.log(r,q);
    },
    receiveAction: GET_SINGLE
  }
  );

export const createGroup = data =>
  dispatchSend('create_group', request.put('/CreateGroup', data), {
    start_action: START_LOAD,
    receiveAction: ADD_GROUP,
    adaptData: resp => {
      console.log(resp);
      return resp;
    }
  });

  export const editGroup = data => 
    dispatchSend('edit_group', request.post('/EditGroup', data), {
      receiveAction: EDIT_GROUP,
      adaptData: resp => {
        console.log(resp);
        return resp;
      },
      adaptError: err => {
        console.log(err.response);
        if(err.response)
          return err.response.data.errors[0].message;
        return "Error";
      }
    })

export const deleteGroup = params => 
    dispatchSend('delete_group', request.delete('DeleteGroup', {params: {id: params.id}}), {
      receiveAction: DELETE_GROUP,
      adaptData: resp => {
        return params;
      }
    })

export const setModalDeleteGroup = group => dispatch =>
    dispatch({
      type: SET_MODAL_DELETE,
      data: group
    })

export const searchGroups = (params) => 
    dispatchSend('search_groups', request.get('/GroupSearch', {params}), {
      adaptData: (r) => {
        console.log(r);
      },
      adaptError: err => {
        console.log(err);
      }
    })