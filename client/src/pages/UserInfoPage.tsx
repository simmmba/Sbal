import React, { useEffect } from 'react'
import UserDetail from '../components/userDetail/UserDetailView'
import UserDetailStore from '../stores/UserDetailStore'
import { useHistory } from 'react-router'
import { useParams } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'

const UserInfoPage = () => {
  const history = useHistory()
  const { id } = useParams()
  UserDetailStore.userInfo(Number(id))
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

export default UserInfoPage
