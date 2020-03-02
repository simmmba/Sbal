import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'
import ReplyInsert from './ReplyInsert'
import StudyStore from '../../stores/StudyStore'
import { NoticeReply } from './StudyGroupType'
import { Avatar } from 'antd'

const Reply = ({ index }: { index: number }) => {
  const cnt = css`
    border-bottom: 1px solid #d5d5d5;
    margin: 20px 0px 15px 0px;
    padding: 10px 0px 5px 15px;
    color: #4c4c4c;
  `

  const comment = css`
    padding: 0px 20px 0px 25px;
  `

  const writer = css`
    display: flex;
    align-items: center;
    font-weight: bold;
    padding-right: 15px;
    font-size: 15px;
  `
  const date = css`
    display: flex;
    align-items: center;
    font-size: 13px;
  `
  const content = css`
    padding-left: 5px;
  `

  const upper = css`
    display: flex;
    justify-content: space-between;
    padding-bottom: 2px;
  `

  const left = css`
    display: flex;
  `
  const right = css`
    display: flex;
  `

  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
  `

  const list = css`
    margin-top: 5px;
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 50px;
    padding-bottom: 5px;
  `

  const replyList = StudyStore.studyGroup.noticeDTOList[Number(index)].replyList

  const clickDeleteIcon = (replyId: number) => {
    if (window.confirm('댓글을 삭제할까요?')) {
      StudyStore.deleteReply(replyId)
    }
  }

  return (
    <div>
      <div css={cnt}>
        <b>{replyList.length}</b>개의 댓글
      </div>
      <div css={comment}>
        {replyList.map((r: NoticeReply) => (
          <div css={list} key={r.id}>
            <div css={upper}>
              <div css={left}>
                <Avatar
                  src={
                    'http://13.124.98.149/images/' + r.writer.profilePhotoDir
                  }
                  icon="user"
                  css={css`
                    margin-right: 5px;
                  `}
                />
                <div css={writer}>{r.writer.nickname}</div>
                <div css={date}>{r.date.substr(0, 16)}</div>
              </div>
              <div css={right}>
                {r.writer.id === StudyStore.loginUser.id ? (
                  <Icon
                    css={icon}
                    type="delete"
                    theme="filled"
                    onClick={() => clickDeleteIcon(Number(r.id))}
                  />
                ) : (
                  <p />
                )}
              </div>
            </div>
            <div css={content}>
              <pre>{r.content}</pre>
            </div>
          </div>
        ))}

        <ReplyInsert index={Number(index)} />
      </div>
    </div>
  )
}

export default Reply
