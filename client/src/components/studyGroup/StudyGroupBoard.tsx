import React, { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import StudyStore from '../../stores/StudyStore'
import { StudyNotice } from './StudyGroupType'
import { Pagination, Empty } from 'antd'
import palette from '../../lib/styles/palette'

const StudyGroupBoard = () => {
  const main = css`
    display: flex;
    flex-direction: column;
  `

  const upper = css`
    display: flex;
    justify-content: space-between;
    padding: 8px 0px 10px 20px;

    @media (max-width: 815px){
      margin-bottom: 10px;
    }
  `

  const title = css`
    display: flex;
    font-weight: bold;
    font-size: 21px;
    color: ${palette.violet[9]};
  `

  const content = css`
    display: flex;
    background: ${palette.violet[0]};
    border-radius: 10px;
    margin-bottom: 2px;

    &:hover {
      background: ${palette.violet[1]};
    }
  `

  const contentTop = css`
    display: flex;

    @media (max-width: 815px){
      display: none;
    }
  `

  const num = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px 10px 5px;
    border-right: 2px dashed #fff;
    width: 100px;
  `

  const btitle = css`
    display: flex;
    align-items: center;
    padding: 10px 20px 10px 22px;
    font-size: 14px;
    border-right: 2px dashed #fff;
    width: 100%;
  `

  const writer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px 10px 5px;
    font-size: 14px;
    width: 250px;
    border-right: 2px dashed #fff;
  `

  const date = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px 10px 5px;
    font-size: 12px;
    width: 200px;
    border-right: 2px dashed #fff;
  `
  const hit = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px 10px 5px;
    font-size: 14px;
    width: 120px;
  `

  const btn = css`
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: ${palette.violet[9]};
    /* background-color: ${palette.violet[1]}; */
    border: 2px solid ${palette.violet[1]};
    border-radius: 7px;
    width: 90px;
    height: 35px;
    padding-left: 5px;
    transition: 0.3s;

    &:hover {
      box-shadow: 2px 2px 3px inset;
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
  const empty = css`
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  const pageNation = css`
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  `

  const noticeList = StudyStore.studyGroup.noticeDTOList
  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 7
  const handlePageChange = (pn: number) => {
    setPageNumber(pn)
  }

  return (
    <div css={main}>
      <div css={upper}>
        <div css={title}>
          📝&nbsp;스터디 게시판
        </div>
        {noticeList.length > 0 && 
          <NavLink css={btn} to={`/study/${StudyStore.studyGroup.id}/newBoard`}>
            글쓰기&nbsp;✒️
          </NavLink>
        }
      </div>
      
      {noticeList.length > 0 ? ( 
        <div>
        
      <div css={contentTop}>
        <div css={num}>번호</div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px 10px 22px;
            font-size: 14px;
            border-right: 2px dashed #fff;
            width: 100%;
          `}
        >
          제목
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 5px 10px 5px;
            font-size: 14px;
            width: 250px;
            border-right: 2px dashed #fff;
          `}
        >
          작성자
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 5px 10px 5px;
            font-size: 14px;
            width: 200px;
            border-right: 2px dashed #fff;
          `}
        >
          작성일
        </div>
        <div css={hit}>조회수</div>
      </div>
      {noticeList
        .reverse()
        .slice(
          (pageNumber - 1) * pageSize,
          (pageNumber - 1) * pageSize + pageSize
        )
        .map((notice: StudyNotice, index: number) => (
          <div css={content} key={notice.id}>
            <div css={num}>
              {noticeList.length - (pageNumber - 1) * pageSize - index}
            </div>
            <div css={btitle}>
              <NavLink
                css={link}
                to={
                  `/study/${StudyStore.studyGroup.id}/board/` +
                  (noticeList.length - (pageNumber - 1) * pageSize - index - 1)
                }
              >
                <b>{notice.title}</b>
              </NavLink>
              {notice.replyList.length > 0 && (
                <span css={comment}>
                  &nbsp;&nbsp;&nbsp;<b>[{notice.replyList.length}]</b>
                </span>
              )}
            </div>
              <div css={writer}>{StudyStore.studyGroup.leader.id === notice.writer.id && <span>👑&nbsp;</span>}{notice.writer.nickname}</div>
            <div css={date}>{notice.date.substr(0, 10)}</div>
            <div css={hit}>{notice.hits}</div>
          </div>
        ))}
      {noticeList.length > pageSize ? (
        <Pagination
          css={pageNation}
          total={noticeList.length}
          onChange={handlePageChange}
          current={pageNumber}
          defaultCurrent={1}
          pageSize={pageSize}
        />
      ) : (
        <div />
      )}
      </div>) : (
        <Empty
          css={empty}
          description={
            <h3>
              <br />
              등록된 글이 없습니다 😮
            </h3>
          }
        >
          <NavLink css={btn} to={`/study/${StudyStore.studyGroup.id}/newBoard`}>
            글쓰기&nbsp;✒️
          </NavLink>
        </Empty>
      )}
    </div>
  )
}

export default StudyGroupBoard
