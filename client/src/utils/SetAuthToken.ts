import apiClient from '../lib/api/client'

const setAuthToken = (AUTH_TOKEN: string | void) => {
  if (AUTH_TOKEN) {
    apiClient.defaults.headers['jwt-auth-token'] = AUTH_TOKEN
  } else {
    delete apiClient.defaults.headers['jwt-auth-token']
  }
}

export default setAuthToken
