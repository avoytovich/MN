import { ACCOUNT_URL} from '../constants/api'
import { getAxiosInstance } from '../shared/request'
const request = getAxiosInstance(ACCOUNT_URL, false)
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
export async function signIn (payload) {


  try {
    const data = await request.post('/Login', payload)
    console.log(data)
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
