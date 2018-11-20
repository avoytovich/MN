import { ACCOUNT_URL } from '../constants/api';
import { getAxiosInstance } from '../shared/request';
const request = getAxiosInstance(ACCOUNT_URL, false);

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

export async function reLogin(payload) {
  try {
    const { data } = await request.post('/RefreshToken', payload);
    const user = localStorage.getItem('user');
    user.token = data;
    localStorage.setItem('user', user);
    return Promise.resolve(data);
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

export async function signOut() {
  const request = getAxiosInstance(AUTH_URL);

  try {
    const user = JSON.parse(localStorage.getItem('hiveUser'));
    await request.post('/signOut', { deviceId: user.deviceId });
    localStorage.removeItem('hiveUser');

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e.response.data.message);
  }
}

export async function forgotPassword({ email }) {
  try {
    const { data } = await request.post('/password/forgot', { email });

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e.data.message);
  }
}

export async function restorePassword({
  email,
  restorePasswordCode,
  newPassword,
  confirmPassword
}) {
  try {
    const hashedPayload = {
      email,
      restorePasswordCode,
      newPassword: md5(newPassword),
      confirmPassword: md5(confirmPassword)
    };
    const { data } = await request.post('password/restore', hashedPayload);

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e.response.data.message);
  }
}
