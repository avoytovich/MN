import { ERROR_LOAD, TOGGLE_SNACKBAR } from '../../constants/actions';
import colors from '../../constants/colors';

const initialState = {
  snackbar: {
    open: false,
    message: '',
    color: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ERROR_LOAD:
      const color = colors.error;
      let message = '';
      if (typeof action.error === 'string') message = action.error;
      else message = action.error.response.data.errors[0];
      return {
        ...state,
        snackbar: {
          open: true,
          message,
          color
        }
      };
    case TOGGLE_SNACKBAR: {
      const color = colors[action.payload.color];

      return {
        ...state,
        snackbar: {
          open: true,
          ...action.payload,
          color
        }
      };
    }

    default:
      return state;
  }
}
