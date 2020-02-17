/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import palette from '../../lib/styles/palette'

type ButtonProps = {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ children, onClick, ...props }: ButtonProps) => (
  <button css={style} onClick={onClick} {...props}>
    {children}
  </button>
)

const style = css`
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.3rem 1rem;
  color: black;
  outline: none;
  cursor: pointer;
  max-height: 40px;
  margin: 13px 0 15px 0;

  background: #d9e5ff;
  &:hover {
    background-color: #b2ccff;
  }
`

export default Button
