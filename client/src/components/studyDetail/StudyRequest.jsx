import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

const StudyRequest = () => {
  const req = [
    {
      nickname: 'SH_BAE',
      score: 80
    },
    {
      nickname: 'lala_la',
      score: 70
    },
    {
      nickname: 'sswww',
      score: 65
    }
  ]

  const table = css`
    border-collapse: collapse;
  `

  const title = css`
    font-size: 20px;
    padding-left: 15px;
  `

  const tr = css``
  const th = css``
  const td = css`
    text-align: center;
  `
  const nickname = css`
    padding-left: 15px;
  `

  return (
    <table border="1" css={table}>
      <tr>
        <td colSpan="3" css={title}>
          참여 요청 ( {req.length} )
        </td>
      </tr>
      <tr>
        <th width="40%">닉네임</th>
        <th width="25%">성실도</th>
        <th width="35%"></th>
      </tr>
      {req.map(r => (
        <tr>
          <td css={nickname}>{r.nickname}</td>
          <td css={td}>{r.score}</td>
          <td css={td}>
            <button>수락</button>
            <button>거절</button>
          </td>
        </tr>
      ))}
    </table>
  )
}

export default StudyRequest
