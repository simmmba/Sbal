import React from 'react'
import UserDetail from '../components/userDetail/UserDetailView'
import UserDetailStore from '../stores/UserDetailStore'
import { useParams } from 'react-router'

const UserInfoPage = () => {
  const { id } = useParams()
  UserDetailStore.userInfo(Number(id))

  return (
    <>
      <UserDetail />
    </>
  )
}

export default UserInfoPage
