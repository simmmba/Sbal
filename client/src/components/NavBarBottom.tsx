/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import {
  WriteIcon,
  WriteColorIcon,
  ListIcon,
  ListColorIcon,
  MapIcon,
  MapColorIcon,
  MyinfoIcon,
  MyinfoColorIcon,
  RegisterIcon
} from '../components/common/Icons'
import { useHistory, useLocation } from 'react-router'
import palette from '../lib/styles/palette'

const NavButtonStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 5px;
  background: none;
  border: none;
  cursor: pointer;
`
const NavStyle = css`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 65px;
  background-color: ${palette.violet[0]};
  z-index: 30;
  /* border-top: 0.5px solid gray; */

  @media screen and (min-width: 815px) {
    display: none;
  }
`

const NavButton = ({
  title,
  children,
  onClick
}: {
  title: string
  children: React.ReactNode
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => {
  return (
    <button css={NavButtonStyle} onClick={onClick}>
      {children}
      <span>{title}</span>
    </button>
  )
}

function NavBarBottom() {
  const history = useHistory()
  const { pathname } = useLocation()

  const handleClick = (to: string) => {
    history.push(to)
  }

  return (
    <div css={NavStyle}>
      <NavButton
        title="개설"
        onClick={() => {
          handleClick('/study/create')
        }}
      >
        {pathname === '/study/create' ? <WriteColorIcon /> : <WriteIcon />}
      </NavButton>
      <NavButton
        title="목록"
        onClick={() => {
          handleClick('/study')
        }}
      >
        {pathname === '/study' ? (
          <ListColorIcon
            css={css`
              margin-top: 2px;
              margin-bottom: 3px;
            `}
          />
        ) : (
          <ListIcon
            css={css`
              margin-top: 2px;
              margin-bottom: 3px;
            `}
          />
        )}
      </NavButton>
      {sessionStorage.token ? (
        <NavButton
          title="추천장소"
          onClick={() => {
            handleClick('/map')
          }}
        >
          {pathname === '/map' ? <MapColorIcon /> : <MapIcon />}
        </NavButton>
      ) : (
        <NavButton
          title="회원가입"
          onClick={() => {
            handleClick('/signup/form')
          }}
        >
          <RegisterIcon />
        </NavButton>
      )}
      {sessionStorage.token ? (
        <NavButton
          title="내정보"
          onClick={() => {
            handleClick('/mypage')
          }}
        >
          {pathname === '/mypage' ? <MyinfoColorIcon /> : <MyinfoIcon />}
        </NavButton>
      ) : (
        <NavButton
          title="로그인"
          onClick={() => {
            handleClick('/login')
          }}
        >
          {pathname === '/login' ? <MyinfoColorIcon /> : <MyinfoIcon />}
        </NavButton>
      )}
    </div>
  )
}

export default NavBarBottom
