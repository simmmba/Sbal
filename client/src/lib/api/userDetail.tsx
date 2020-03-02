import apiClient from './client'
import setAuthToken from '../../utils/setAuthToken'

export const myInfo = () => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/user/myPage')
}

export const findPassword = (email: string) => {
  return apiClient.get(`/user/findPassword/${email}`)
}

export const updatePassword = (password: string, newPassword: string) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  const user = {
    pw: password
  }
  const newUser = {
    pw: newPassword
  }
  return apiClient.post('/user/updatePassword', [user, newUser])
}

export const upload = (formdata: FormData) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.post('/user/profileUpload', formdata)
}

export const userInfo = (userId: number) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get(`/user/userInfo/${userId}`)
}
