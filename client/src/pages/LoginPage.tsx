/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useLocation } from 'react-router'
import { useObserver } from 'mobx-react'
import UserStore from '../stores/UserStore'

import AuthTemplate from '../components/auth/AuthTemplate'
import AuthForm from '../components/auth/AuthForm'
import AuthFooter from '../components/auth/AuthFooter'
import TempPassword from '../components/auth/TempPassword'

function LoginPage() {
  const location = useLocation()
  const path = location.pathname.substring(1)

  return useObserver(() => (
    <div>
      <AuthTemplate>
        {UserStore.isLoggingIn ? (
          <div
            css={css`
              text-align: center;
              min-height: 300px;
              font-size: 20px;
              color: #5f3dc4;
            `}
          >
            <br />
            로그인 중입니다...
          </div>
        ) : path === 'login/temp-password' ? (
          <TempPassword />
        ) : path === 'signup' ? (
          <div>
            <AuthForm type={path} />
            <div
              css={css`
                height: 60px;
              `}
            />
            <AuthFooter />
          </div>
        ) : (
          <div>
            <AuthForm type={path} />
            <div
              css={css`
                height: 10px;
              `}
            />
            <AuthFooter />
          </div>
        )}
      </AuthTemplate>
    </div>
  ))
}

export default LoginPage
