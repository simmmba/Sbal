import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import StudyStore from '../../stores/StudyStore'
import { StudyNotice } from './StudyGroupType'

const StudyGroupBoard = () => {
  const noticeList = StudyStore.studyGroup.noticeDTOList
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
        <NavLink css={btn} to={`/study/${StudyStore.studyGroup.id}/newBoard`}>
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
      {noticeList.reverse().map((notice: StudyNotice, index) => (
        <div css={content} key={notice.id}>
          <div css={num}>{noticeList.length - index}</div>
          <div css={btitle}>
            <NavLink
              css={link}
              to={`/study/${StudyStore.studyGroup.id}/board/` + index}
            >
              {notice.title}
            </NavLink>
          </div>
          <div css={writer}>{notice.writer.nickname}</div>
          <div css={date}>{notice.date.substr(0, 16)}</div>
          <div css={hit}>{notice.hits}</div>
          <div css={hit}>{notice.replyList.length}</div>
        </div>
      ))}
    </div>
  )
}

export default StudyGroupBoard
