/**@jsx jsx */
import { jsx, css } from '@emotion/core'

const SwitchStyle = css`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 20px;

  & input {
    display: none;
  }

  & span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  & span:after {
    position: absolute;
    content: '';
    height: 10px;
    width: 10px;
    left: 4px;
    bottom: 5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  & input:checked + span {
    background-color: #845ef7;
  }

  & input:checked + span:after {
    -webkit-transform: translateX(10px);
    -ms-transform: translateX(10px);
    transform: translateX(10px);
  }
`

const ToggleSwitch = () => (
  <label css={SwitchStyle}>
    <input type="checkbox" />
    <span></span>
  </label>
)

export default ToggleSwitch
