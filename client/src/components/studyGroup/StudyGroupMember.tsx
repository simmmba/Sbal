import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'

const StudyGroupMember = () => {
  const member = [
    {
      date: '2020-02-01',
      nickname: 'seongho',
      attendance: '100'
    },
    {
      date: '2020-01-29',
      nickname: 'seowon',
      attendance: '80'
    },
    {
      date: '2020-02-03',
      nickname: 'jspark',
      attendance: '95'
    },
    {
      date: '2020-02-04',
      nickname: 'sswoo',
      attendance: '90'
    }
  ]

  const main = css`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-content: center; */
    /* border: 1px solid black; */
  `

  const upper = css`
    display: flex;
    justify-content: space-between;
    padding: 8px 0px 10px 20px;
  `

  const title = css`
    display: flex;
    font-weight: bold;
    font-size: 21px;
    color: #004584;
    /* padding: 0px 17px 0px 5px; */
  `

  const content = css`
    display: flex;
    background: #f4fcff;
    border-radius: 10px;
    margin-bottom: 2px;
    /* height: 50px; */
    /* cursor: pointer; */

    &:hover {
      background-color: #e6f7ff;
    }
  `

  const list = css`
    display: flex;
    margin-bottom: 2px;
  `

  const listNickname = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-right: 2px dashed #fff;
    width: 100%;
  `

  const num = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    border-right: 2px dashed #fff;
    width: 50px;
    /* font-weight: bold; */
  `

  const nickname = css`
    display: flex;
    align-items: center;
    padding: 10px 20px 10px 22px;
    font-weight: bold;
    font-size: 14px;
    border-right: 2px dashed #fff;
    width: 100%;
  `
  const date = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    font-size: 14px;
    width: 200px;
    border-left: 2px dashed #fff;
  `

  const attendance = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    font-size: 14px;
    width: 150px;
  `

  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  return (
    <div css={main}>
      <div css={upper}>
        <div css={title}>
          <Icon
            css={icon}
            type="smile"
            style={{ fontSize: 24 }}
            theme="twoTone"
            twoToneColor="navy"
          />
          &nbsp;스터디 멤버
        </div>
      </div>
      <div css={list}>
        <div css={num}>&nbsp;&nbsp;</div>
        <div css={listNickname}>닉네임</div>
        <div css={attendance}>성실도</div>
        <div css={date}>가입일</div>
      </div>
      {member.reverse().map((m, index) => (
        <div css={content}>
          <div css={num}>{index + 1}</div>
          <div css={nickname}>{m.nickname}</div>
          <div css={attendance}>{m.attendance}%</div>
          <div css={date}>{m.date}</div>
        </div>
      ))}
    </div>
  )
}

export default StudyGroupMember
