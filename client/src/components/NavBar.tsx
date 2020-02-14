import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import Button from './common/Button'
import { Link, NavLink } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import UserStore from '../stores/UserStore'

const Spacer = styled.div`
  height: 4rem;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 21px;
  color: black;
  margin-right: auto;
  &:hover {
    color: black;
  }
`

const NavFixBlock = styled.div`
  position: fixed;
  background: white;
  width: 100%;
  z-index: 10;

  top: 0;
  left: 0;
  -webkit-box-shadow: 0 1px 2px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 1px 2px rgba(57, 63, 72, 0.3);
  box-shadow: 0 1px 2px rgba(57, 63, 72, 0.3);
`

const Navbar = styled.nav`
  display: flex;
  padding: 0 20px;
  max-width: 79em;
  width: 90%;
  margin: 0 auto;
`

const StyledLink = styled(NavLink)`
  margin-left: 10px;
  padding: 20px;
  color: black;
  @media (max-width: 415px) {
    display: none;
  }
`
const StyledLinkPhone = styled(NavLink)`
  margin-left: 10px;
  padding: 20px;
  color: black;
`

const StyledButton = styled(Button)`
  padding: auto 0;
`

const NavBar = () => {
  const logout = useCallback(() => {
    UserStore.logout()
  }, [])

  return useObserver(() => (
    <>
      <NavFixBlock>
        <Navbar>
          <Logo to="/">
            스<small>터디의</small> 발<small>견</small>
          </Logo>
          <StyledLink to="/study/create">스터디 개설</StyledLink>
          <StyledLink to="/study">스터디 목록</StyledLink>
          <StyledLink to="/register">나와 가까운 장소</StyledLink>
          <StyledLink to="/study/13">ㅋㅋ</StyledLink>
          {!UserStore.token ? (
            <div>
              <StyledLinkPhone to="/signup">회원가입</StyledLinkPhone>
              <StyledButton>
                <Link to="/login">로그인</Link>
              </StyledButton>
            </div>
          ) : (
            <div>
              <StyledLinkPhone to="/mypage">내 정보</StyledLinkPhone>
              <StyledButton onClick={logout}>로그아웃</StyledButton>
            </div>
          )}
        </Navbar>
      </NavFixBlock>
      <Spacer />
    </>
  ))
}

export default NavBar
