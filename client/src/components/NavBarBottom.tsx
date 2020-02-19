/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { WriteIcon } from '../components/common/Icons'
import { useHistory } from 'react-router'
import * as H from 'history'

const NavButtonStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center
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
  background-color: white;
  @media screen and (min-width: 815px) {
    display: none;
  }
`
const itleStyle = css`
  font-size: 30px;
`
const eesetButton = css`
  border: none;
  color: none;
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
        ><WriteIcon />
      </NavButton>
      <NavButton
        title="목록"
        onClick={() => {
          handleClick('/study')
        }}
      >
        ><WriteIcon />
      </NavButton>
      <NavButton
        title="추천 장소"
        onClick={() => {
          handleClick('/map')
        }}
      >
        ><WriteIcon />
      </NavButton>
      <NavButton
        title="내 정보"
        onClick={() => {
          handleClick('/mypage')
        }}
      >
        ><WriteIcon />
      </NavButton>
    </div>
  )
}

export default NavBarBottom
