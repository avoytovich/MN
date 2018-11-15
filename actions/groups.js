import dispatchSend from '../services/dispatchSend';
import { START_LOAD, GET_GROUPS,  ADD_GROUP, GET_SINGLE, EDIT_GROUP, DELETE_GROUP, SET_MODAL_DELETE, SEARCH_GROUPS, UPDATE_SPEC_DATA, SET_RUNTIME_VARIABLE, END_LOAD } from '../constants/actions';

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
      console.log(r,q);
    },
    receiveAction: GET_SINGLE
  }
  );

export const createGroup = data =>
  dispatchSend('create_group', request.put('/CreateGroup', data), {
    start_action: START_LOAD,
    receiveAction: END_LOAD,
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
    dispatchSend('searchGroups', request.get('/GroupSearch', {params}), {
      receiveAction: UPDATE_SPEC_DATA,
      adaptData: (r) => {
        return r;
      },
      adaptError: err => {
        if(err.response)
          return err.response.data.errors[0].message;
        else return "Error search";
      }
    })

export const loadIcons = () => 
    dispatchSend('loadIcons', request.get('/GetGroupIcons'), {
      receiveAction: UPDATE_SPEC_DATA,
      adaptData: (r) => r,
      adaptError: err => {
        if(err.response)
          return err.response.data.errors[0].message;
        else return "Error load icons";
      }
    })