import apiClient from './client'
import setAuthToken from '../../utils/setAuthToken'
//import { userInfo } from '../../components/userDetail/UserInfoTypes'

export const userInfo = () => {
  if (sessionStorage.token) {
    //alert(sessionStorage.token)
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/user/myPage')
}
