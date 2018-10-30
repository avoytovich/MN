import { TOGGLE_SNACKBAR } from '../../constants/actions';
import colors from '../../constants/colors'

const initialState = {
  snackbar: {
    open: false,
    message: '',
    color: ''
  }
}


export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SNACKBAR:
      const color = colors[action.payload.color]
      return {
        ...state,
        snackbar: {
          open: true,
          ...action.payload,
          color
        }
      }
    default:
      return state
  }
}

