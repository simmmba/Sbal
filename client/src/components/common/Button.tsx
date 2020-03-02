/** @jsx jsx */
import { jsx, css } from '@emotion/core'

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
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.3rem 1rem;
  outline: none;
  cursor: pointer;
  max-height: 40px;
  margin: 13px 0 15px 0;
  border: none;
  background: #e5dbff;
  color: #5f3dc4;

  &:hover {
    background-color: #f3f0ff;
    color: #6741d9;
  }
`

export default Button
