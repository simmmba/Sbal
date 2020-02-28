import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { message } from 'antd'

export const PrivateRoute: any = ({
  component: Component,
  ...rest
}: {
  component: any
}) => {
  if (sessionStorage.token) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else {
    message.info('로그인이 필요합니다!')
    return <Redirect to="/login" />
  }
}
export const PublicRoute: any = ({
  component: Component,
  ...rest
}: {
  component: any
}) => {
  if (!sessionStorage.token) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else {
    message.info('비회원을 위한 페이지입니다')
    return <Redirect to="/mypage" />
  }
}
