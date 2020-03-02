import React from 'react'
import { NavLink } from 'react-router-dom'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import Reply from './Reply'
import StudyStore from '../../stores/StudyStore'
import { useParams, useHistory } from 'react-router'
import { StudyNotice } from './StudyGroupType'
import { useEffect } from 'react'
import palette from '../../lib/styles/palette'

const StudyGroupBoardDetail = () => {
  const { index } = useParams()
  const notice: StudyNotice = StudyStore.studyGroup.noticeDTOList[Number(index)]
  const main = css`
    display: flex;
    flex-direction: column;
  `

  const upper = css`
    display: flex;
    padding: 8px 0px 10px 20px;
  `

  const title = css`
    display: flex;
    font-weight: bold;
    font-size: 21px;
    color: ${palette.violet[9]};
  `

  const content = css`
    display: flex;
    flex-direction: column;
    border: 3px solid ${palette.violet[0]};
    border-radius: 7px;
    margin-bottom: 2px;
    margin-top: 10px;
  `

  const btitle = css`
    display: flex;
    align-items: center;
    padding: 10px 0px 2px 22px;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
  `

  const writer = css`
    display: flex;
    align-items: center;
    font-size: 14px;
  `

  const date = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding-left: 10px;
  `
  const hit = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding-left: 10px;
  `

  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #747474;

    &:hover {
      font-weight: bold;
      color: #747474;
    }
  `

  const detail = css`
    display: flex;
    justify-content: space-between;
    padding: 3px 50px 12px 27px;
    color: #747474;
    flex-wrap: wrap;
  `

  const top = css`
    display: flex;
    flex-direction: column;
    background: ${palette.violet[0]};
    border-radius: 5px;
    margin-bottom: 2px;
  `
  const bottom = css`
    display: flex;
    padding: 20px;
    min-height: 150px;
  `

  const left = css`
    display: flex;
  `
  const right = css`
    display: flex;
  `

  const navLink = css`
    display: flex;
    color: #747474;
    padding-right: 15px;

    &:hover {
      font-weight: bold;
      color: #747474;
    }
  `

  const Emoji = (props: {
    label: string | undefined
    symbol: React.ReactNode
  }) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {props.symbol}
    </span>
  )

  const history = useHistory()
  const clickDeleteIcon = (id: number, deleteIndex: number) => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      StudyStore.deleteNotice(id)
      StudyStore.studyGroup.noticeDTOList.splice(deleteIndex, 1)
      history.goBack()
    }
  }

  useEffect(() => {
    StudyStore.increaseNoticeHits(Number(notice.id), Number(index))
  })

  return (
    <div css={main}>
      <div css={upper}>
        <div css={title}>
          <Emoji label="board" symbol="📝" />
          &nbsp;스터디 게시판
        </div>
      </div>
      <div>
        <div css={content}>
          <div css={top}>
            <div css={btitle}>{notice.title}</div>
            <div css={detail}>
              <div css={left}>
                <div css={writer}>{notice.writer.nickname}&nbsp;&nbsp; |</div>
                <div css={date}>{notice.date.substr(0, 16)}&nbsp;&nbsp; |</div>
                <div css={hit}>조회 {notice.hits}</div>
              </div>
              {notice.writer.id === StudyStore.loginUser.id ? (
                <div css={right}>
                  <NavLink
                    css={navLink}
                    to={`/study/${StudyStore.studyGroup.id}/editBoard/${Number(
                      index
                    )}`}
                  >
                    <u>
                      수정
                      <Emoji label="edit" symbol="✏️" />
                    </u>
                  </NavLink>
                  <span
                    css={icon}
                    onClick={() => clickDeleteIcon(notice.id, Number(index))}
                  >
                    <u>
                      삭제
                      <Emoji label="delete" symbol="✂️" />
                    </u>
                  </span>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div css={bottom}>{notice.content}</div>
        </div>
      </div>
      <Reply index={Number(index)} />
    </div>
  )
}

export default StudyGroupBoardDetail
