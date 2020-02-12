/** @jsx jsx */
import React, { useCallback } from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import UserStore from '../../stores/UserStore'
import { RouteComponentProps, withRouter } from 'react-router'
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import {
  AuthFormBlock,
  StyledInput,
  StyledLabel,
  StyledButton,
  FlexBetween
} from './AuthStyled'
import ToggleSwitch from '../common/ToggleSwitch'
import { AuthFormProps, LoginState } from './AuthTypes'

const textMapForHeader: { [key: string]: string } = {
  login: '로그인',
  signup: '회원가입'
}

const textMapForFooter: { [key: string]: string } = {
  login: '로그인',
  signup: '이메일 아이디 만들기'
}

function AuthForm({ type, history }: RouteComponentProps & AuthFormProps) {
  const state: LoginState = useLocalStore(() => ({
    email: '',
    password: '',

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      state[e.target.name] = e.target.value
    }
  }))

  const onClickToSignupForm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      history.push('/signup/form')
    },
    []
  )

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const dataToSend = {
      email: state.email,
      pw: state.password
    }
    UserStore.login(dataToSend)
    e.preventDefault()
    history.push('/mypage')
  }, [])

  const headerText = textMapForHeader[type]
  const footerText = textMapForFooter[type]

  return useObserver(() => (
    <AuthFormBlock>
      <h3>{headerText}</h3>
      {type === 'login' && (
        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="email">이메일 아이디</StyledLabel>
          <StyledInput
            placeholder="ex) sbal123@email.com"
            autoComplete="email"
            name="email"
            value={state.email}
            //type="email"
            onChange={state.onChange}
          />
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput
            placeholder="비밀번호를 입력하세요"
            autoComplete="password"
            name="password"
            value={state.password}
            type="password"
            onChange={state.onChange}
          />
          <FlexBetween>
            <FlexBetween>
              <ToggleSwitch />
              <span
                css={css`
                  font-size: 0.85rem;
                  margin-left: 5px;
                `}
              >
                자동 로그인
              </span>
            </FlexBetween>
            <Link
              css={css`
                font-size: 0.85rem;
                margin-left: 5px;
              `}
              to="/"
            >
              아이디/비밀번호 찾기
            </Link>
          </FlexBetween>

          <StyledButton>{footerText}</StyledButton>
        </form>
      )}
      {type === 'signup' && (
        <StyledButton marginTop={15} onClick={onClickToSignupForm}>{footerText}</StyledButton>
      )}
    </AuthFormBlock>
  ))
}

export default withRouter(AuthForm)
