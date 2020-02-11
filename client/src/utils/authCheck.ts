import UserStore from '../stores/UserStore'

export const authCheck = (history: any) => {
  if (!UserStore.token) {
    history.push('/login')
  }
}

export const loggedIn = (history: any) => {
  if (UserStore.token) {
    history.push('/')
  }
}

export const loadToken = () => {
  if (!UserStore.token) {
    if (sessionStorage.token) {
      UserStore.token = sessionStorage.getItem('token')
    }
  }
}
