import React from 'react'

import UserDetail from '../components/userDetail/UserDetailView'

import UserDetailStore from '../stores/UserDetailStore'
import { useLocation } from 'react-router'
import UpdatePassword from '../components/auth/UpdatePassword'

const MyInfoPage = () => {
  const location = useLocation()
  const path = location.pathname.substring(1)

  UserDetailStore.mypage()

  return (
    <>
      {path === 'mypage/update/password' ? <UpdatePassword /> : <UserDetail />}
    </>
  )
}

export default MyInfoPage
