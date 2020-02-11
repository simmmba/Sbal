import React, { useEffect } from 'react'
import UserDetail from '../components/userDetail/UserDetailView'
import { useHistory } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'

const MyInfoPage = () => {
  const history = useHistory()
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
