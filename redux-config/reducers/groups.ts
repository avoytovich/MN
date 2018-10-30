import { GET_GROUPS } from '../../constants/actions';
const initialState = {
  groups: []
};


export default (state = initialState, action:any) => {
  switch (action.type) {
    case GET_GROUPS:
      return Object.assign({}, state, {
        groups: action.data
      });
    default:
      return state;
  }
};
