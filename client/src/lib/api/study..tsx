import apiClient from './client'

const setAuthToken = (AUTH_TOKEN: string | void) => {
  if (AUTH_TOKEN) {
    apiClient.defaults.headers['jwt-auth-token'] = AUTH_TOKEN
  } else {
    delete apiClient.defaults.headers['jwt-auth-token']
  }
}

export const mainStudyList = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.get('/')
}

export const getStudyDetails = (studyId : number) => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.get('/study/' + studyId)
}