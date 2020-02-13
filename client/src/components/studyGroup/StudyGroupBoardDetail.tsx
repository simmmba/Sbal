import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'

const StudyGroupBoardDetail = () => {
  const board = [
    {
      id: 1,
      title: '공지사항 테스트1',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    }
  ]

  const reply = [
    {
      id: 1,
      content: '',
      writer: '',
      date: ''
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
  `

  const btitle = css`
    display: flex;
    align-items: center;
    padding: 10px 20px 10px 22px;
    font-weight: bold;
    font-size: 14px;
    border-right: 2px dashed #fff;
    width: 100%;
  `

  const writer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    font-size: 14px;
    width: 250px;
    border-right: 2px dashed #fff;
  `

  const date = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    font-size: 14px;
    width: 200px;
    border-right: 2px dashed #fff;
  `
  const hit = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    font-size: 14px;
    width: 100px;
  `

  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const btn = css`
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: navy;

    background: #d9e5ff;
    border-radius: 7px;
    width: 100px;
    height: 30px;
  `

  const link = css`
    color: #353535;
  `

  return (
    <div css={main}>
      <div css={upper}>
        <div css={title}>
          <Icon
            css={icon}
            type="snippets"
            style={{ fontSize: 24 }}
            theme="twoTone"
            twoToneColor="navy"
          />
          &nbsp;게시글 읽기
        </div>
      </div>
      {board.map(b => (
        <div css={content}>
          <div css={btitle}>{b.title}</div>
          <div css={writer}>{b.writer}</div>
          <div css={date}>{b.date}</div>
          <div css={hit}>{b.hits}</div>
        </div>
      ))}
    </div>
  )
}

export default StudyGroupBoardDetail
