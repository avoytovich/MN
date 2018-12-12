import { MEMBER_URL } from '../constants/api';
import { getAxiosInstance } from '../shared/request';

const request = getAxiosInstance(MEMBER_URL);

export async function createMember(payload) {
  try {
    const { values, groupId } = payload;
    const { data } = await request.put(`/${groupId}/CreateMember`, values);

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function editMember(payload) {
  try {
    const { data } = await request.post('/EditMember', payload);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function getMember(memberId) {
  try {
    const { data } = await request.post(`/GetMember?memberId=${memberId}`);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}
