import { getAxiosInstance } from '../shared/request';
import dispatchSend from '../services/dispatchSend';
import { END_LOAD, UPDATE_SPEC_DATA } from '../constants/actions';

const request = getAxiosInstance('/api/Invite');

export const getInvites = () =>
  dispatchSend('get_invites', request.get('/GetInvites'), {
    adaptData: r => r,
    adaptError: err =>
      err.response
        ? err.response.data.errors[0].message
        : 'Error loading invites',
    receiveAction: UPDATE_SPEC_DATA
  });
