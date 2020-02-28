import React from 'react'
import AuthTemplate from '../components/auth/AuthTemplate'
import SignupForm from '../components/auth/SignupForm'
import { useLocation } from 'react-router'
function RegisterPage() {
  const location = useLocation()
  const path = location.pathname.substring(1)

  return (
    <>
      <AuthTemplate>
        <SignupForm type={path} />
      </AuthTemplate>
    </>
  )
}

export default RegisterPage
