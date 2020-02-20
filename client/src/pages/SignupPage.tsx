import React from 'react'
import AuthTemplate from '../components/auth/AuthTemplate'
import SignupForm from '../components/auth/SignupForm'
import { RouteComponentProps, withRouter } from 'react-router-dom'
function RegisterPage({ location }: RouteComponentProps) {

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
