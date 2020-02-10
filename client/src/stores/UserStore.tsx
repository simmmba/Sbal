import { observable } from 'mobx'
import * as userAPI from '../lib/api/auth'
import { LoginData, SignupData } from '../components/auth/AuthTypes'

const UserStore = observable({
  isLoggingIn: false,
  token: null,
  data: null,

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

  async login(data: LoginData) {
    this.isLoggingIn = true
    try {
      const res = await userAPI.login(data)
      const token = res.headers.token
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
