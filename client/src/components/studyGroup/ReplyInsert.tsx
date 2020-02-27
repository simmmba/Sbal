import React, { useState, useCallback } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import TextArea from 'antd/lib/input/TextArea'
import StudyStore from '../../stores/StudyStore'
import palette from '../../lib/styles/palette'

const ReplyInsert = ({ index }: { index: number }) => {
  const write = css`
    display: flex;
    margin-top: 5px;
  `

  const btn = css`
    border: none;
    cursor: pointer;
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    border: 2px solid ${palette.violet[1]};

    background: ${palette.violet[0]};
    border-radius: 5px;
    width: 70px;
    height: 35px;
    transition: 0.3s;
    margin-left: 5px;

    &:hover {
      background-color: ${palette.violet[1]};
    }
  `

  const textarea = css`
    width: 100%;
  `

  const notice = StudyStore.studyGroup.noticeDTOList[Number(index)]

  const [value, setValue] = useState('')

  const onChangeTextArea = useCallback(e => {
    setValue(e.target.value)
  }, [])

  const clickEnrollBtn = () => {
    const newReply = {
      content: value,
      noticeId: notice.id
    }
    StudyStore.enrollNewReply(newReply, Number(index)).then(() => setValue(''))
  }

  return (
    <div css={write}>
      <TextArea
        css={textarea}
        rows={3}
        placeholder="댓글 입력"
        value={value}
        onChange={onChangeTextArea}
        // onPressEnter={clickEnrollBtn}
      />
      <button css={btn} onClick={clickEnrollBtn}>
        등록
      </button>
    </div>
  )
}

export default ReplyInsert
