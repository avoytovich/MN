import axios from 'axios'
import get from 'lodash/get'
// import { history } from 'src/store'
//
// import { reLogin } from 'actions/auth'
//
// import { SIGN_IN } from 'consts/routes'
//
// async function requestCheckAuthInterceptor (config) {
//   const user = JSON.parse(window.localStorage.getItem('hiveUser'))
//   const token = get(user, 'token')
//
//   if (token) {
//     const expirationTime = user.tokenExpireTime * 1000
//     const timeNow = new Date().getTime()
//
//     /* Relogin if token expires in less than a minute */
//     if ((expirationTime - timeNow) < 60) {
//       const response = await reLogin({
//         refreshToken: user.refreshToken,
//         deviceId: user.deviceId
//       })
//       config.headers['App-token'] = response.token
//     } else {
//       config.headers['App-token'] = token
//     }
//   }
//
//   return config
// }
//
// function unauthorizedResponseInterceptor (error) {
//   /* handling 401 */
//   if (!error.response || error.response.status === 401) {
//     history.push(SIGN_IN)
//   }
//
//   return Promise.reject(error.response)
// }

export function getAxiosInstance (url, isSecured = true) {
  const request = axios.create({
    baseURL: url
  })

  if (isSecured) {
    request.interceptors.request.use(requestCheckAuthInterceptor)
  }

  request.interceptors.response.use(
    response => response && response.data, // success handler
    null//unauthorizedResponseInterceptor // error handler
  )

  return request
}
