import apiClient from './client'

const setAuthToken = (AUTH_TOKEN: string | void) => {
  if (AUTH_TOKEN) {
    apiClient.defaults.headers.common['Authorization'] = AUTH_TOKEN
  } else {
    delete apiClient.defaults.headers.common['Authorization']
  }
}

export const mainStudyList = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return apiClient.get('/')
}
