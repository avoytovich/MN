import { SIGN_IN, RE_LOGIN } from '../../constants/actions';
const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.data
      }
    case RE_LOGIN:
      return {
        user: {
          ...state.user,
          token: action.data
        }
      }
    default:
      return state;
  }
};
