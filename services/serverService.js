import { get as _get } from 'lodash';
import { FRONT_PROD } from '../constants/global';
import {SET_RUNTIME_VARIABLE, START_LOAD} from "../constants/actions";

export default function isServer() {
  if (!process.browser) return true;
  return false;
}

export function isProduction() {
  return isServer()
    ? process.env.NODE_ENV === 'production' && process.env.NODE_URL !== 'stage'
    : location.hostname.replace('www.', '') === FRONT_PROD;
}

export function getLocale(key) {
  if (!isServer()) {
    if (key == 'accessToken') {
        const token =_get(JSON.parse(localStorage.getItem('user')), 'token');
        return token[key];
    } else {
      return _get(JSON.parse(localStorage.getItem('user')), key);
    }
  }
}
