import { get as _get, isArray, isEmpty } from 'lodash';
import qs from 'qs';
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

export function changeQuery(router, name = 'modal', newValue) {
  const index = router.asPath.indexOf('?');
  const query =
    index !== -1 ? qs.parse(router.asPath.substring(index + 1)) : {};
  if (isArray(name)) {
    name.forEach(item => {
      query[item] && delete query[item];
    });
  } else {
    query[name] && delete query[name];
  }
  if (newValue) query[name] = newValue;
  const newUrl =
    index !== -1
      ? `${router.asPath.substring(0, index)}${
        !isEmpty(query) ? `?${qs.stringify(query)}` : ''
        }`
      : `${router.asPath}${!isEmpty(query) ? `?${qs.stringify(query)}` : ''}`;
  return newUrl;
}
