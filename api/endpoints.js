import _ from 'lodash';
import Axios from 'axios';

const endpoints = {
  getGroups: {
    url: '/api/Group/GetGroups?limit={limit}&offset={offset}',
    method: 'get'
  },
  createGroup: {
    url: '/api/Group/CreateGroup',
    method: 'put'
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
  return 'https://18.217.30.162' + string.replace(/{.*?}/, '');
};

export const sendRequest = (name, data) => {
  const endpoint = endpoints[name];
  const { url, method } = endpoint;

  Axios.put(
    'https://18.217.30.162/api/Group/CreateGroup',
    {
      somedata: 'asdas',
      adsdsa: 'dwa'
    },
    {
      'Content-Type': 'application/json',
      Organization: '718143998',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGV2MkBtZXRrbm93LmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNDAiLCJpc1JlZnJlc2giOiJGYWxzZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJuYmYiOjE1NDA0NjQ2NTEsImV4cCI6MTU0MTY3NDI1MSwiaXNzIjoiTWV0S25vd0F1dGhTZXJ2ZXIiLCJhdWQiOiJDbGllbnQifQ.84kqy94FXqYRiLc0ELkGNu7qnWcLdy4TKb8MpV2-AR0`
    }
  );

  return Axios({
    method,
    url: createUrl(url, data),
    data: method !== 'get' ? data : undefined,
    headers: {
      Organization: '718143998',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGV2MkBtZXRrbm93LmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNDAiLCJpc1JlZnJlc2giOiJGYWxzZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJuYmYiOjE1NDA0NjQ2NTEsImV4cCI6MTU0MTY3NDI1MSwiaXNzIjoiTWV0S25vd0F1dGhTZXJ2ZXIiLCJhdWQiOiJDbGllbnQifQ.84kqy94FXqYRiLc0ELkGNu7qnWcLdy4TKb8MpV2-AR0`
    }
  });
};
