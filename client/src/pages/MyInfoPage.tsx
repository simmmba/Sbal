import React, { useEffect } from 'react'

import UserDetail from '../components/userDetail/UserDetailView'

import UserDetailStore from '../stores/UserDetailStore'
import { useHistory, useLocation } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'
import UpdatePassword from '../components/auth/UpdatePassword'

const MyInfoPage = () => {
  const history = useHistory()
  const location = useLocation()
  const path = location.pathname.substring(1)

  UserDetailStore.mypage()
  useEffect(() => {
    loadToken(history)
    authCheck(history)
  }, [history])
  return (
    <>
      {path === 'mypage/update/password' ? <UpdatePassword /> : <UserDetail />}
    </>
  )
}

export default MyInfoPage
