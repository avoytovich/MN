import { TOGGLE_SNACKBAR } from '../constants/actions';

export function toggleSnackbar(message, color = 'error', open = true) {
  return {
    type: TOGGLE_SNACKBAR,
    payload: {
      message,
      color,
      open
    }
  };
}
