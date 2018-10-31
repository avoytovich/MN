import dispatchSend from '../services/dispatchSend';
import { LOGIN_SUCCESS, START_LOAD } from '../constants/actions';
import { sendRequest } from '../api/endpoints';

const getLoginPromise = (data) =>
  sendRequest('login', data);

export const login = (data) => 
    dispatchSend('login', getLoginPromise(data), {
        start_action: START_LOAD,
        receiveAction: LOGIN_SUCCESS,
        adaptData: resp => {
          console.log(resp);
          return resp.data;
        }
      })