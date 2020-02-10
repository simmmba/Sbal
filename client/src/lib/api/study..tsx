import apiClient from './client'

const setAuthToken = (AUTH_TOKEN: string | void) => {
  if (AUTH_TOKEN) {
    apiClient.defaults.headers.common['Authorization'] = AUTH_TOKEN
  } else {
    delete apiClient.defaults.headers.common['Authorization']
  }
}

export const getMainStudyList = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
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
