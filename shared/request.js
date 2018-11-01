import axios from 'axios'
import Router from 'next/router'

import { reLogin } from 'actions/account';
import { bindActionCreators } from 'redux';
import { setData } from 'actions/updateData';

async function requestCheckAuthInterceptor (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (user) {
    const expireDate = user.token.expireDate * 1000
    const timeNow = new Date().getTime();
    /* Relogin if token expires in less than a minute */
    if ((expireDate - timeNow) < 60) {
      const response = await reLogin({
        RefreshToken: user.token.refreshToken
      })
      config.headers['Authorization'] = 'Bearer ' + response.token.accessToken
    } else {
      config.headers['Authorization'] = 'Bearer ' + user.token.accessToken
    }
    config.headers['Organization'] = user.organizationId
  }
<<<<<<< Updated upstream
  return config
=======

  return config;
>>>>>>> Stashed changes
}

function unauthorizedResponseInterceptor (error) {
  /* handling 401 */
  if (!error.response || error.response.status === 401) {
    Router.push({
      pathname: '/'
    })
  }

  return Promise.reject(error)
}

export function getAxiosInstance (url, isSecured = true) {

  const request = axios.create({
    baseURL: url
  })  
  if (isSecured) {
    request.interceptors.request.use(requestCheckAuthInterceptor)
  }
  request.interceptors.response.use(
    response => response && response.data, // success handler
    unauthorizedResponseInterceptor // error handler
  )
  
  return request;
}
