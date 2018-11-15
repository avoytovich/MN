import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import _ from 'lodash';

// Load reducers here
import runtime from './runtime';
// import localization from './localization';
import groups from './reducers/groups';
import questions from './reducers/questions';
import { saveState, loadState } from 'helpers/cache';
import snackbar from './reducers/snackbar';


export function initializeStore(initialState = {}) {

  // Assign localstorage cache to state
  Object.assign(initialState, loadState());
  
  const root = combineReducers({
     runtime,  groups, snackbar, questions
  });
  const store = createStore( 
    root,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  
/**
 * Enable localstorage cache
 */
store.subscribe(_.throttle(() => {
  saveState({
    groups: store.getState().groups
  });
}, 1000));
  
  return store;
}