import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// Load reducers here
import runtime from './runtime';
import localization from './localization';
import groups from './reducers/groups';

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({ runtime, localization, groups }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
