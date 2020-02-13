import apiClient from './client'
import setAuthToken from '../../utils/setAuthToken'
import { Study } from '../../components/main/MainTypes'

export const getMainStudyList = () => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/')
}

export const getStudyDetails = (studyId: number) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/study/' + studyId)
}

export const createStudy = (studyData: Study) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.post('/study', studyData)
}
