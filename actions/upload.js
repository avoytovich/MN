import { UPLOAD_URL } from '../constants/api'
import { getAxiosInstance } from '../shared/request'
const request = getAxiosInstance(UPLOAD_URL)


export async function uploadProfileImage (payload) {
  try {
    const { data } = await request.put('/UploadProfileImage', payload )
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}