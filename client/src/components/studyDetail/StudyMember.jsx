import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

const StudyMember = () => {
  const mem = [
    {
      nickname: 'SSAFY_12th'
    },
    {
      nickname: 'Samsung_'
    }
  ]

  const btn = css`
    color: #5d5d5d;
    background: #faecc5;
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    /* padding: 5px 15px 5px 15px; */
    /* margin: 0px 0px 0px 2px; */
    width: 70px;
    height: 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: #ffe08c;
    }
  `

  const table = css`
    border-collapse: collapse;
    /* padding-bottom: 100px; */
    /* float: left; */
    width: 350px;
  `

  const title = css`
    font-size: 20px;
    padding: 10px 10px 10px 15px;
    font-weight: bold;
    /* border-top: 2px solid #ddd; */
    border-bottom: 2px solid #ddd;
    color: #5d5d5d;
  `

  const tr = css``
  const th = css`
    border-top: 4px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: grey;
    padding: 7px;
    text-align: center;
  `
  const td = css`
    text-align: center;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: #5d5d5d;
    padding: 5px;
  `
  const nickname = css`
    padding-left: 30px;
    border-top: 2px solid grey;
    border-bottom: 2px solid #ddd;
    color: #353535;
  `

  const top = css`
    padding-bottom: 30px;
  `

  return (
    <div css={top}>
      <table css={table}>
        <tr>
          <td colSpan="2" css={title}>
            스터디 멤버 ( {mem.length} )
          </td>
        </tr>
        <tr>
          <th width="70%" css={th}>
            닉네임
          </th>
          <th width="30%"></th>
        </tr>
        {mem.map(m => (
          <tr>
            <td css={nickname}>{m.nickname}</td>
            <td css={td}>
              <button css={btn}>내보내기</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default StudyMember
