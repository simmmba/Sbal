import React, { useState, useCallback } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import TextArea from 'antd/lib/input/TextArea'

const ReplyInsert = ({ onInsert }) => {
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
    /* color: navy; */
    border: 2px solid #d1e9ff;

    background: #e6f7ff;
    border-radius: 5px;
    width: 70px;
    height: 35px;
    transition: 0.3s;
    margin-left: 5px;

    &:hover {
      background-color: #d1e9ff;
    }
  `

  const textarea = css`
    width: 100%;
  `

  const [value, setValue] = useState('')

  const onChange = useCallback(e => {
    setValue(e.target.value)
  }, [])

  // const handleChange = useCallback(e => {
  //   if (e.key === 'Enter') {
  //     setValue(`${e.target.value}\n`)
  //   }
  //   setValue(e.target.value)
  // })

  const onClick = useCallback(
    e => {
      onInsert(value)
      setValue('')
    },
    [onInsert, value]
  )

  return (
    <div css={write}>
      <TextArea
        css={textarea}
        rows={3}
        placeholder="댓글 입력"
        value={value}
        onChange={onChange}
        // onPressEnter={handleChange}
      />
      <button css={btn} onClick={onClick}>
        등록
      </button>
    </div>
  )
}

export default ReplyInsert
