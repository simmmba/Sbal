import { observable } from 'mobx'
import * as userAPI from '../lib/api/auth'
import * as userDetail from '../lib/api/userDetail'
import { LoginData, SignupData } from '../components/auth/AuthTypes'

const UserStore = observable({
  isLoggingIn: false,
  token: null,
  data: null,
  //{id, pw, email, phoneNum, nickname, gender, introduction, 
  //city, town, evaluation, profilePhotoDir, socialLogin, interestDTOList, ledStudyList, joinedStudyList}

  async signup(data: SignupData) {
    this.isLoggingIn = true
    try {
      const res = await userAPI.register(data)
      const token = res.headers.token
      sessionStorage.setItem('token', token)
      this.token = token
      this.isLoggingIn = false
    } catch (error) {
      alert('로그인에 실패했습니다')
      this.isLoggingIn = false
    }
  },

  async mypage(){
    this.isLoggingIn = true
    try{
      const res = await userDetail.userInfo()
      this.isLoggingIn = false
      //this.data = res.data.value.nickname
      this.data = res.data
      alert(this.data)
    }
    catch (error){
      alert('사용자 정보를 가져오지 못했습니다.')
      this.isLoggingIn = false
    }
  },

  async login(data: LoginData) {
    this.isLoggingIn = true
    try {
      const res = await userAPI.login(data)
      const token = res.headers['jwt-auth-token']
      sessionStorage.setItem('token', token)
      this.token = token
      this.isLoggingIn = false
    } catch (error) {
      alert('로그인에 실패했습니다')
      this.isLoggingIn = false
    }
  },

  logout() {
    sessionStorage.removeItem('token')
    this.token = null
  }
})

export default UserStore
