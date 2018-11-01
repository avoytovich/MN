import axios from 'axios'
import get from 'lodash/get'
import Router from 'next/router'

import { reLogin } from 'actions/account'

async function requestCheckAuthInterceptor (config) {
  const state = JSON.parse(window.localStorage.getItem('state'))
  const user = get(state, 'auth.user')

  if (user.token) {
    const expireDate = user.token.expireDate * 1000
    const timeNow = new Date().getTime()

    /* Relogin if token expires in less than a minute */
    if ((expireDate - timeNow) < 60) {
      const response = await reLogin({
        RefreshToken: user.token.refreshToken
      })
      config.headers['Authorization'] = response.token
    } else {
      config.headers['Authorization'] = user.token.accessToken
    }
    config.header['Organization'] = user.organizationId
  }

  return config
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

  return request
}
