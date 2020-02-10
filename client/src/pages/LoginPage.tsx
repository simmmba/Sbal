/** @jsx jsx */
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { jsx, css } from '@emotion/core'
import AuthTemplate from '../components/auth/AuthTemplate'
import AuthForm from '../components/auth/AuthForm'
import Footer from '../components/auth/Footer'

function LoginPage({ location }: RouteComponentProps) {
  const path = location.pathname.substring(1)

  return (
    <div>
      <AuthTemplate>
        <AuthForm type={path} />
        <div
          css={css`
            height: 50px;
          `}
        ></div>
        <Footer />
      </AuthTemplate>
    </div>
  )
}

export default withRouter(LoginPage)
