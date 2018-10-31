import _ from 'lodash';
import Axios from 'axios';

const endpoints = {
  getGroups: {
    url: '/api/Group/GetGroups?limit={limit}&offset={offset}',
    method: 'get',
    auth: true
  },
  createGroup: {
    url: '/api/Group/CreateGroup',
    method: 'put',
    auth: true
  },
  login: {
    url: '/api/account/login',
    method: 'post',
    auth: true
  }
};
const createUrl = (string, params) => {
  /**
   * Evaluate keys with props {key} = key.param
   */
  _.keys(params).map(key => {
    string = string.replace(`{${key}}`, params[key]);
    return null;
  });
  /**
   * Remove the rest
   */
  return string.replace(/{.*?}/, '');
};

export const sendRequest = (name, data) => {
  const endpoint = endpoints[name];
  const { url, method, auth } = endpoint;
  return Axios({
    method: method,
    url: createUrl(url, data),
    data: method !== 'get' ? data : undefined,
    headers: {
      'Organization': endpoint.auth === true? '718143998': null,
      'Authorization': endpoint.auth === true? `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdG1haWxAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIyIiwiaXNSZWZyZXNoIjoiRmFsc2UiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTU0MDU2MTI0OCwiZXhwIjoxNTQxNzcwODQ4LCJpc3MiOiJNZXRLbm93QXV0aFNlcnZlciIsImF1ZCI6IkNsaWVudCJ9.sVDxO-2lcSeb0vrI2bP1utWHHZOVarrNE00h8mRLcl0`: null
    }
  });
};
