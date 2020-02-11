import apiClient from './client'

const setAuthToken = (AUTH_TOKEN: string | null) => {
  if (AUTH_TOKEN) {
    apiClient.defaults.headers.common['jwt-auth-token'] = AUTH_TOKEN
  } else {
    delete apiClient.defaults.headers.common['jwt-auth-token']
  }
}

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
