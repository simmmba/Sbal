import setAuthToken from '../../utils/setAuthToken'
import apiClient from './client'
import {LoginData, SignupData, UpdateData} from '../../components/auth/AuthTypes'

export const login = (loginData: LoginData) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.post('/user/signIn', loginData)
}

export const register = (signUpUser: SignupData) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.post('/user', signUpUser)
}

export const getSocialData = (code: string, service: string) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.post('/user/auth', {code, service})
}

export const validateEmail = (email: string) => {
  return apiClient.get('/user/validateEmail/' + email)
}

export const validateNickname = (nickName: string) => {
  return apiClient.get('/user/validateNickname/' + nickName)
}

export const getMyInfoDetailsForModify = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.get('/user/modifyProfile')
}

export const update = (updateUser: UpdateData) => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return apiClient.put('/user', updateUser);
}