import React, { useCallback } from 'react'
/** @jsx jsx */
import { useLocalStore, useObserver } from 'mobx-react'
import { css, jsx } from '@emotion/core'
import UserStore from '../../stores/UserStore'
import {
  AuthFormBlock,
  StyledInput,
  StyledLabel,
  StyledButton
} from './AuthStyled'
import AuthTemplate from './AuthTemplate'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { message } from 'antd'

function UpdatePassword() {
  const title = css`
    text-align: center;
    font-weight: bold;
    color: #6741d9;
    padding-bottom: 15px;
  `

  const history = useHistory()
  const state: { [key: string]: string } = useLocalStore(() => ({
    currentPassword: '',
    newPassword: '',
    newPasswordToConfirm: ''
  }))

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    state[e.target.name] = e.target.value
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

  return useObserver(() => (
    <AuthTemplate>
      <AuthFormBlock>
        <h2 css={title}>비밀번호 변경</h2>
        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="pw">현재 비밀번호</StyledLabel>
          <StyledInput
            placeholder="현재 비밀번호를 입력하세요"
            autoComplete="password"
            name="currentPassword"
            value={state.currentPassword}
            type="password"
            onChange={onChange}
          />
          <StyledLabel htmlFor="pw2">새 비밀번호</StyledLabel>
          <StyledInput
            placeholder="새 비밀번호를 입력하세요"
            autoComplete="password"
            name="newPassword"
            value={state.newPassword}
            type="password"
            onChange={onChange}
          />
          <StyledLabel htmlFor="pw2">새 비밀번호 확인</StyledLabel>
          <StyledInput
            placeholder="새 비밀번호를 입력하세요"
            autoComplete="password"
            name="newPasswordToConfirm"
            value={state.newPasswordToConfirm}
            type="password"
            onChange={onChange}
          />
          <StyledButton width={100} marginTop={15}>
            비밀번호 변경
          </StyledButton>
        </form>
      </AuthFormBlock>
      <Link
        css={css`
          display: inline-block;
          margin-top: 40px;
        `}
        to="/mypage"
      >
        ⬅ 뒤로 가기
      </Link>
    </AuthTemplate>
  ))
}

export default UpdatePassword
