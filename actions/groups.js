import dispatchSend from '../services/dispatchSend';
import Axios from 'axios';
import { START_LOAD, END_LOAD, GET_GROUPS } from '../constants/actions';
import groupsdata from '../testdata/groups.js';

// Fake promise
export const getGroupsPromise = () => {
  return new Promise((rs, rj) => {
    setTimeout(() => { }, 1500);
    rs(groupsdata);
  });
};

export const getGroups = () =>
  dispatchSend('get_groups', getGroupsPromise(), {
    start_action: START_LOAD,
    receiveAction: GET_GROUPS,
    adaptData: resp => {
      return resp;
    }
  });

