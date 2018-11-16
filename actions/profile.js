import { PROFILE_URL } from '../constants/api'
import { getAxiosInstance } from '../shared/request'
const request = getAxiosInstance(PROFILE_URL)

export async function getProfile () {
  try {
    const { data } = await request.get('/GetProfile')

    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function editProfile (payload) {
  try {
    const { data } = await request.post('/EditProfile', payload)
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}