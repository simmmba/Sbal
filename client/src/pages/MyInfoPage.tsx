import React, { useEffect } from 'react'
import UserDetail from '../components/userDetail/UserDetailView'
import UserDetailStore from '../stores/UserDetailStore'
import { useHistory } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'

const MyInfoPage = () => {
  const history = useHistory()

  UserDetailStore.mypage()
  useEffect(() => {
    loadToken()
    authCheck(history)
  }, [history])
  return (
    <>
      <UserDetail />
    </>
  )
}

export default MyInfoPage
