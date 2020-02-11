import apiClient from './client'
import setAuthToken from '../../utils/setAuthToken'

export const getMainStudyList = () => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/')
}

export const getStudyList = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.get('/')
}
export const getStudyDetail = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.get('/')
}

export const getStudyDetails = (studyId: number) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.get('/study/' + studyId)
}
