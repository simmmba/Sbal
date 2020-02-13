import React, { useEffect } from 'react'
import AuthTemplate from '../components/auth/AuthTemplate'
import SignupForm from '../components/auth/SignupForm'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useHistory } from 'react-router'
import { loggedIn } from '../utils/authCheck'

function RegisterPage({ location }: RouteComponentProps) {
  const history = useHistory()
  // useEffect(() => {
  //   loggedIn(history)
  // }, [history])

  const path = location.pathname.substring(1)

  return (
    <>
      <AuthTemplate>
        <SignupForm type={path} />
      </AuthTemplate>
    </>
  )
}

export default withRouter(RegisterPage)
