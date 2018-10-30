import { ACCOUNT_URL} from '../constants/api'
import { getAxiosInstance } from '../shared/request'
const request = getAxiosInstance(ACCOUNT_URL, false)
const localStorage = window.localStorage

export async function signIn (payload) {


  try {
    const { data } = await request.post('/Login', payload)
    localStorage.setItem('user', data)
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e.data)
  }
}

// export function signUp (payload) {
//   return async dispatch => {
//     const updatedPayload = {
//       ...payload,
//       password: md5(payload.password),
//       deviceId: generateDeviceId(),
//       birthday: moment(payload.birthday).format(SERVER_DATE_FORMAT)
//     }
//
//     try {
//       const response = await request.post('/signUp', updatedPayload)
//
//       return Promise.resolve(response)
//     } catch (e) {
//       dispatch(toggleSnackbar(e.data.message))
//
//       return Promise.reject(e)
//     }
//   }
// }
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
