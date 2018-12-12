import { getAxiosInstance } from 'shared/request';
import dispatchSend from 'services/dispatchSend';
import Member from 'pages/edit-member';
import { END_LOAD } from '../constants/actions';

const request = getAxiosInstance('/api/Member');

export interface Question {
  question: string;
  answer: string;
}

export interface Member {
  id: number;
  firstName: string;
  imageContent: {
    mediumImage: string;
  };
  department: string;
  title: string;
  number: string;
  aboutme: string;
  email: string;
  city: string;
  questions: any[];
}

export const getMember = (id: number) =>
  request.post<Member>(`/GetMember?memberId=${id}`).then(r => r.data);
