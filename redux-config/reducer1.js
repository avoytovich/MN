import { cloneDeep } from 'lodash';
import Cookies from 'js-cookie';

import { CHANGE_LANGUAGE } from '../constants/actions';


const defState = {};

export default function localization(state = cloneDeep(defState), action) {
  if (action.type === CHANGE_LANGUAGE) {
    return { lang: action.lang };
  }

  return defState;
}
