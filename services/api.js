import axios from 'axios';
import qs from 'qs';

import { getLocale, isProduction } from './serverService';

import { SERVER_URL, PROD_SERVER_URL, FRONT_PROD } from '../constants/global';

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${getLocale('accessToken')}`,
  Organization: getLocale('organizationId'),
  'Access-Control-Allow-Origin': '*' // temp
});

const getDefHeaders = () => ({
  'Content-Type': 'application/json',
  ...getAuthHeaders()
});

const buildUrl = url => {
  if (isProduction()) {
    return PROD_SERVER_URL + url;
  }
  // return SERVER_URL + url;
  return url;
};

export const getFormData = () => ({
  'Content-Type': 'multipart/form-data',
  ...getAuthHeaders()
});

export const formData = options =>
  axios({
    headers: getFormData(),
    ...options,
    url: buildUrl(options.url || options)
  });

export const wrapRequest = options =>
  axios({
    headers: getDefHeaders(),
    ...options,
    url: buildUrl(options.url || options)
  });

export const buildCRUD = url => {
  if (!url) return Promise.reject('Need URL');
  return {
    post: (data, plusUrl = '') => {
      if (!data) return Promise.reject('Need Data');
      return wrapRequest({ method: 'POST', url: url + plusUrl, data });
    },
    put: (id, data) => {
      if (!data || !id) return Promise.reject('Need Data or id');
      return wrapRequest({ method: 'PUT', url: `${url}/${id}`, data });
    },
    putWithoutId: (data, plusUrl = '') =>
      wrapRequest({ method: 'PUT', url: `${url}${plusUrl}`, data }),
    patch: (id, data) => {
      if (!data || !id) return Promise.reject('Need Data or id');
      return wrapRequest({ method: 'PATCH', url: `${url}/${id}`, data });
    },
    patchPlus: (data = {}, plusUrl = '') =>
      wrapRequest({ method: 'PATCH', url: `${url}${plusUrl}`, data }),
    deleteRequest: (plusUrl = '') =>
      wrapRequest({ method: 'POST', url: `${url}/delete${plusUrl}` }),
    sendDelete: (data, plusUrl = '') =>
      wrapRequest({ method: 'DELETE', url: `${url}${plusUrl}`, data }),
    get: (params = {}, plusUrl = '', needParamsSerializer, customSerializer) =>
      wrapRequest({
        method: 'GET',
        url: `${url}${plusUrl}`,
        params,
        paramsSerializer: needParamsSerializer
          ? par =>
              qs.stringify(par, { arrayFormat: 'indices', allowDots: true })
          : customSerializer
      }),
    getWithId: (id, plusUrl = '') => {
      if (!id) return Promise.reject('Need id');
      return wrapRequest({ method: 'GET', url: `${url}/${id}${plusUrl}` });
    },
    // bookings?profashionalId=5&state=active
    /* getListWithIdStatus: (id, state, plusUrl = '') => {
      if (!id) return Promise.reject('Need id');
      return wrapRequest({ method: 'GET', url: `${url}?profashionalId=${id}&state=${state}${plusUrl}` });
    }, */
    getList: (opt = {}, data) => {
      const {
        params: notSpredParams = {},
        additionalUrl,
        method = 'GET',
        paramsSerializer
      } = opt;
      const params = { ...notSpredParams };
      if (params.page === undefined) {
        params.page = 0;
      }
      if (params.pageSize === undefined) {
        params.pageSize = DEFAULT_LIST_SIZE;
      }
      let sendUrl = url;
      if (additionalUrl) {
        sendUrl += `/${additionalUrl}`;
      }
      return wrapRequest({
        method,
        url: sendUrl,
        params,
        paramsSerializer,
        data
      });
    }
  };
};
