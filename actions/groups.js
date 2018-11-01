import dispatchSend from '../services/dispatchSend';
import { START_LOAD, GET_GROUPS, ADD_GROUP } from '../constants/actions';
import { sendRequest } from '../api/endpoints';

import { GROUP_URL } from '../constants/api'
import { getAxiosInstance } from '../shared/request'
const request = getAxiosInstance(GROUP_URL);

const getGroupsPromise = (limit, offset) =>
  sendRequest('getGroups', { limit, offset });
const createGroupPromise = data => sendRequest('createGroup', data);

export const getGroups = (params) =>
  dispatchSend('get_groups',  request.get('/GetGroups', {params} ), {
    start_action: START_LOAD,
    receiveAction: GET_GROUPS,
    adaptData: resp => {
      console.log(resp);
      return resp.data;
    }
  });

export const createGroup = data =>
  dispatchSend('create_group', createGroupPromise(data), {
    start_action: START_LOAD,
    receiveAction: ADD_GROUP,
    adaptData: resp => {
      console.log(resp);
      return resp.data;
    }
  });
