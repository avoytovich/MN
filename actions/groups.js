import dispatchSend from '../services/dispatchSend';
import { START_LOAD, GET_GROUPS, ADD_GROUP } from '../constants/actions';
import { sendRequest } from '../api/endpoints';

const getGroupsPromise = (limit, offset) =>
  sendRequest('getGroups', { limit, offset });
const createGroupPromise = data => sendRequest('createGroup', data);

export const getGroups = (limit, offset) =>
  dispatchSend('get_groups', getGroupsPromise(limit, offset), {
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
