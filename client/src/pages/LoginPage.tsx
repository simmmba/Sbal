/** @jsx jsx */
import { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { jsx, css } from '@emotion/core'
import { loadToken, loggedIn } from '../utils/authCheck'
import { useHistory } from 'react-router'
import { useObserver } from 'mobx-react'
import UserStore from '../stores/UserStore'

import AuthTemplate from '../components/auth/AuthTemplate'
import AuthForm from '../components/auth/AuthForm'
import AuthFooter from '../components/auth/AuthFooter'

function LoginPage({ location }: RouteComponentProps) {
  const history = useHistory()
  useEffect(() => {
    loadToken()
    loggedIn(history)
  }, [UserStore.isLoggingIn, history])

  const path = location.pathname.substring(1)

  return useObserver(() => (
    <div>
      <AuthTemplate>
        {UserStore.isLoggingIn ? (
          <div>로그인 중입니다...</div>
        ) : (
          <div>
            <AuthForm type={path} />
            <div
              css={css`
                height: 50px;
              `}
            />
            <AuthFooter />
          </div>
        )}
      </AuthTemplate>
    </div>
  ))
}

export default withRouter(LoginPage)
