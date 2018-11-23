import { getAxiosInstance } from 'shared/request';
import { END_LOAD } from '../constants/actions';
import dispatchSend from 'services/dispatchSend';
import Member from 'pages/edit-member';
const request = getAxiosInstance('/api/Member');

export interface Member {
    id: number,
    firstName: string,
    imageContent: {
        mediumImage: string
    },
    email: string
}

export const getMember = (id: number) => 
  request.post<Member>('/GetMember?memberId=' + id ).then(r => r.data);