import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import Button from './common/Button'
import { Link, NavLink } from 'react-router-dom'
import { useObserver } from 'mobx-react'
import UserStore from '../stores/UserStore'
import { useHistory } from 'react-router'
import palette from '../lib/styles/palette'

const Spacer = styled.div`
  height: 4rem;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 25px;
  margin-right: auto;
  color: ${palette.violet[0]};
  transition: 0.3s;

  &:hover {
    color: ${palette.violet[1]};
    font-size: 21px;
  }
`

const NavFixBlock = styled.div`
  position: fixed;
  background: ${palette.violet[5]};
  width: 100%;
  z-index: 10;

  top: 0;
  left: 0;
  -webkit-box-shadow: 0 1px 2px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 1px 2px rgba(57, 63, 72, 0.3);
  box-shadow: 0 1px 2px rgba(57, 63, 72, 0.3);
  @media (max-width: 815px) {
    height: 4rem;
    display: flex;
    align-items: center;
  }
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
  color: white;

  &:hover {
    color: ${palette.violet[1]};
  }

  @media (max-width: 815px) {
    display: none;
  }
`
const StyledLinkPhone = styled(NavLink)`
  margin-left: 10px;
  padding: 20px;
  color: white;
  transition: 0.4s;

  &:hover {
    color: ${palette.violet[1]};
    text-decoration: underline;
  }
  @media (max-width: 815px) {
    display: none;
  }
`

const StyledButton = styled(Button)`
  padding: auto 0;
  transition: 0.3s;
  background-color: ${palette.violet[1]};

  &:hover {
    background-color: ${palette.violet[2]};
  }
  @media (max-width: 815px) {
    display: none;
  }
`

const NavBar = () => {
  const history = useHistory()
  const logout = useCallback(() => {
    UserStore.logout(history)
  }, [history])

  return useObserver(() => (
    <>
      <NavFixBlock>
        <Navbar>
          <Logo to="/">
            스<small>터디의</small>&nbsp;발<small>견</small>
          </Logo>
          <StyledLink to="/study/create">스터디 개설</StyledLink>
          <StyledLink to="/study">스터디 목록</StyledLink>
          <StyledLink to="/map">나와 가까운 장소</StyledLink>
          {/* <StyledLink to="/study/1">ㅋㅋ</StyledLink> */}
          {!UserStore.token ? (
            <div>
              <StyledLinkPhone to="/signup">회원가입</StyledLinkPhone>
              <StyledButton>
                <NavLink to="/login">로그인</NavLink>
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
