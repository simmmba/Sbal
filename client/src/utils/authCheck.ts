import UserStore from '../stores/UserStore'
import * as H from 'history'
import { message } from 'antd'

export const authCheck = (history: H.History) => {
  if (!sessionStorage.token) {
    history.push('/login')
  }
  if (!UserStore.token) {
    history.push('/login')
  }
}

export const loggedIn = (history: H.History) => {
  // if (!sessionStorage.token) {
  //   history.push('/login')
  // }
  if (UserStore.token) {
    history.push('/')
  }
}

export const loadToken = (history: H.History) => {
  if (!UserStore.token) {
    if (sessionStorage.token) {
      if (sessionStorage.token !== undefined) {
        UserStore.token = sessionStorage.token
      } else {
        message.info('세션이 만료되었습니다. 다시 로그인해주세요')
        history.push('/')
      }
    }
  }
}
