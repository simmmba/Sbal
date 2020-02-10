import UserStore from '../stores/UserStore'

const authCheck = (history: any) => {
  if (!UserStore.token) {
    if (sessionStorage.token) {
      UserStore.token = sessionStorage.getItem('token')
    } else {
      history.push('/login')
    }
  }
}

export default authCheck
