import { SIGN_IN, RE_LOGIN, LOGOUT } from '../../constants/actions';

const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.data
      };
    case RE_LOGIN:
      return {
        user: {
          ...state.user,
          token: action.data
        }
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
