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

export const getStudyGroup = (studyId: number) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/study/' + studyId)
}

export const deleteStudySchedule = (scheduleId: number) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.delete('/study/schedule/' + Number(scheduleId))
}

export const insertNotice = (newNotice: object) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.post('/notice', newNotice)
}

export const updateNotice = (editedNotice: object) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.put('/notice', editedNotice)
}

export const deleteNotice = (id: number) => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.delete('/notice/' + Number(id))
}