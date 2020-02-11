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

  const approveBtn = css`
    color: #5d5d5d;
    background: #d9e5ff;
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    /* padding: 5px 15px 5px 15px; */
    margin: 0px 0px 0px 3px;
    width: 40px;
    height: 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #b2ccff;
    }
  `

  const denyBtn = css`
    color: #5d5d5d;
    background: #ffd8d8;
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    /* padding: 5px 15px 5px 15px; */
    margin: 0px 0px 0px 3px;
    width: 40px;
    height: 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #ffa7a7;
    }
  `

  const btnBox = css`
    display: flex;
    justify-content: flex-end;
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
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: #353535;
  `

  const bottom = css`
    padding-bottom: 20px;
  `

  return (
    <div css={bottom}>
      <table css={table}>
        <tr>
          <td colSpan="3" css={title}>
            참여 요청 ( {req.length} )
          </td>
        </tr>
        <tr>
          <th width="45%" css={th}>
            닉네임
          </th>
          <th width="25%" css={th}>
            성실도
          </th>
          <th width="30%" css={th}></th>
        </tr>
        {req.map(r => (
          <tr>
            <td css={nickname}>{r.nickname}</td>
            <td css={td}>{r.score}</td>
            <td css={td}>
              <div css={btnBox}>
                <button css={approveBtn}>수락</button>
                <button css={denyBtn}>거절</button>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default StudyRequest
