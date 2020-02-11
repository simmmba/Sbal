import apiClient from './client'
//import { userInfo } from '../../components/userDetail/UserInfoTypes'

const setAuthToken = (AUTH_TOKEN: string | void) => {
    if (AUTH_TOKEN) {
      apiClient.defaults.headers.common['jwt-auth-token'] = AUTH_TOKEN
    } else {
      delete apiClient.defaults.headers.common['jwt-auth-token']
    }
  }

  export const userInfo = () => {
    if (sessionStorage.token) {
      //alert(sessionStorage.token)
      setAuthToken(sessionStorage.token)
    }
    return apiClient.get('/user/myPage')
  }