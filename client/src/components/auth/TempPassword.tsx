/** @jsx jsx */
import React, { useCallback } from 'react'
import { useLocalStore, useObserver } from 'mobx-react'
import UserDetailStore from '../../stores/UserDetailStore'

import { useHistory } from 'react-router'
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import {
  AuthFormBlock,
  StyledInput,
  StyledLabel,
  StyledButton,
  Guide
} from './AuthStyled'
import { message } from 'antd'

function TempPassword() {
  const history = useHistory()
  const state = useLocalStore(() => ({
    email: ''
  }))

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    state.email = e.target.value
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    UserDetailStore.findPassword(state.email, history)
  }, [])

  return useObserver(() => (
    <AuthFormBlock>
      <h2
        css={css`
          text-align: center;
          font-weight: bold;
          color: #6741d9;
          padding-bottom: 10px;
        `}
      >
        비밀번호 찾기
      </h2>

      <form onSubmit={handleSubmit}>
        <StyledLabel htmlFor="email">이메일 아이디</StyledLabel>
        <StyledInput
          placeholder="이메일 아이디를 입력하세요"
          autoComplete="email"
          name="email"
          value={state.email}
          type="email"
          onChange={onChange}
          css={css`
            margin-bottom: 20px;
          `}
        />
        <Guide>
          * 가입시 입력하신 이메일 아이디로 임시 비밀번호를 보내드립니다
        </Guide>
        <Guide>
          * 혹시 이메일 아이디가 기억나지 않을 경우, 고객센터로 문의해주세요
        </Guide>

        <StyledButton marginTop={15} type="submit">
          임시 비밀번호 받기
        </StyledButton>
      </form>
      <Link
        css={css`
          display: inline-block;
          margin-top: 40px;
        `}
        to="/login"
      >
        ⬅ 뒤로 가기
      </Link>
    </AuthFormBlock>
  ))
}

export default TempPassword
