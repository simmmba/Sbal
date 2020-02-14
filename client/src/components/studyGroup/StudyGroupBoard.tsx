import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import StudyStore from '../../stores/StudyStore'

const StudyGroupBoard = () => {
  const board = [
    {
      id: 1,
      title: '공지사항 테스트1',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트2',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 0
    },
    {
      id: 1,
      title: '공지사항 테스트3',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트4',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트5',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트6',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트7',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트8',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트9',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
    },
    {
      id: 1,
      title: '공지사항 테스트10',
      writer: 'jspark',
      hits: 15,
      date: '2020-02-01',
      comment: 2
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

    &:hover {
      background-color: #e6f7ff;
    }
  `

  const num = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    border-right: 2px dashed #fff;
    width: 50px;
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
    transition: 0.3s;

    &:hover {
      background-color: #b2ccff;
    }
  `

  const link = css`
    color: #353535;
  `

  const comment = css`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #ff5e00;
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
          &nbsp;스터디 게시판
        </div>
        <NavLink
          css={btn}
          to={`/study/${StudyStore.studyGroup.id}/board/insert`}
        >
          글쓰기&nbsp;&nbsp;
          <Icon
            css={icon}
            type="edit"
            style={{ fontSize: 20 }}
            theme="twoTone"
            twoToneColor="navy"
          />
        </NavLink>
      </div>
      {board.reverse().map((b, index) => (
        <div css={content}>
          <div css={num}>{board.length - index}</div>
          <div css={btitle}>
            <NavLink css={link} to={`board/${index + 1}`}>
              {b.title}
            </NavLink>
            {b.comment > 0 && (
              <div css={comment}>&nbsp;&nbsp;&nbsp;[ {b.comment} ]</div>
            )}
          </div>
          <div css={writer}>{b.writer}</div>
          <div css={date}>{b.date}</div>
          <div css={hit}>{b.hits}</div>
        </div>
      ))}
    </div>
  )
}

export default StudyGroupBoard
