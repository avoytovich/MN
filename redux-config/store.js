import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import runtime from './runtime';
import localization from './localization';
import reducer1 from './reducer1';

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({ runtime, localization, reducer1 }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}
