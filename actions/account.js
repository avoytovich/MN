import { ACCOUNT_URL} from '../constants/api'
import { getAxiosInstance } from '../shared/request'
const request = getAxiosInstance(ACCOUNT_URL, false)
import dispatchSend from '../services/dispatchSend';
import { START_LOAD, SIGN_IN, RE_LOGIN} from '../constants/actions';

export const signIn = (payload) =>
  dispatchSend('login', request.post('/Login', payload), {
    start_action: START_LOAD,
    receiveAction: SIGN_IN,
    adaptData: resp => {
      return resp;
    },
    adaptError: e => {
      return e;
    }
  });
export const reLogin = ({ RefreshToken }) =>
  dispatchSend('reLogin', request.post('/RefreshToken', { RefreshToken }), {
    start_action: START_LOAD,
    receiveAction: RE_LOGIN,
    adaptData: resp => {
      return resp;
    },
    adaptError: e => {
      return e;
    }
  });

export const signUp = (payload) =>
  dispatchSend('signUp', request.post('/Register', payload), {
    start_action: START_LOAD,
    receiveAction: SIGN_IN,
    adaptData: resp => {
      return resp;
    },
    adaptError: e => {
      return e;
    }
  });

//
// export async function signOut () {
//   const request = getAxiosInstance(AUTH_URL)
//
//   try {
//     const user = JSON.parse(localStorage.getItem('hiveUser'))
//     await request.post('/signOut', { deviceId: user.deviceId })
//     localStorage.removeItem('hiveUser')
//
//     return Promise.resolve()
//   } catch (e) {
//     return Promise.reject(e.response.data.message)
//   }
// }
//
// export async function forgotPassword ({ email }) {
//   try {
//     const { data } = await request.post('/password/forgot', { email })
//
//     return Promise.resolve(data)
//   } catch (e) {
//     return Promise.reject(e.data.message)
//   }
// }
//
// export async function restorePassword ({
//                                          email,
//                                          restorePasswordCode,
//                                          newPassword,
//                                          confirmPassword
//                                        }) {
//   try {
//     const hashedPayload = {
//       email,
//       restorePasswordCode,
//       newPassword: md5(newPassword),
//       confirmPassword: md5(confirmPassword)
//     }
//     const { data } = await request.post('password/restore', hashedPayload)
//
//     return Promise.resolve(data)
//   } catch (e) {
//     return Promise.reject(e.response.data.message)
//   }
// }
//
//
//
