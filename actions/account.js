import { ACCOUNT_URL} from '../constants/api'
import { getAxiosInstance } from '../shared/request'
const request = getAxiosInstance(ACCOUNT_URL, false)
const authedRequest = getAxiosInstance(ACCOUNT_URL)

export async function signIn(payload) {
  try {
    const { data } = await request.post('/Login', payload);
    localStorage.removeItem('state');
    localStorage.setItem('user', JSON.stringify({ ...data }));

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

const state = {
  prom: null
}

export async function reLogin(payload) {
  try {
    if(!state.prom)
    {
      state.prom = request.post('/RefreshToken', payload);
      const { data } = await state.prom;
      const user = localStorage.getItem('user');
      user.token = data;
      localStorage.setItem('user', user);
      state.prom = null;
      return Promise.resolve(data);
    }
      return state.prom;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function signUp(payload) {
  try {
    const { data } = await request.post('/Register', payload);
    localStorage.removeItem('state');
    localStorage.setItem('user', JSON.stringify({ ...data }));
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function signOut () {
  try {
    await authedRequest.delete('/Logout')
    localStorage.removeItem('user')
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function resetPassword () {
  try {
    const { email } = JSON.parse(localStorage.getItem('user'))
    await authedRequest.post('ResetPassword', {email})
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}




export async function changePassword (payload) {
  try {
    const { data } = await authedRequest.post('/ChangePassword', payload)
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}



