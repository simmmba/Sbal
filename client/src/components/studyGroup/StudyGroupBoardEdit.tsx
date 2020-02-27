import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useParams, useHistory } from 'react-router'
import StudyStore from '../../stores/StudyStore'
import { useLocalStore } from 'mobx-react'
import { CreatedNotice, StudyNotice } from './StudyGroupType'
import palette from '../../lib/styles/palette'

const StudyGroupBoardEdit = () => {
  const upper = css`
    display: flex;
    padding: 8px 0px 10px 20px;
  `

  const title = css`
    display: flex;
    font-weight: bold;
    font-size: 21px;
    color: ${palette.violet[9]};
    margin-bottom: 10px;
  `

  const content = css`
    display: flex;
    flex-direction: column;
    background: ${palette.violet[0]};
    border-radius: 5px;
    margin-bottom: 2px;
  `

  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const top = css`
    display: flex;
    flex-direction: column;
    background: ${palette.violet[1]};
    border-radius: 5px;
    padding: 10px;
  `
  const bottom = css`
    display: flex;
    margin: 10px;
    min-height: 150px;
  `

  const btnGroup = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  `

  const cancel = css`
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray[7]};
    background: ${palette.yellow[1]};
    border-radius: 7px;
    width: 70px;
    height: 30px;
    margin: 6px 5px 0px 5px;
    transition: 0.3s;

    &:hover {
      background-color: ${palette.yellow[2]};
    }
  `

  const ok = css`
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: #353535;
    background: ${palette.violet[1]};
    border-radius: 7px;
    width: 70px;
    height: 30px;
    margin: 6px 5px 0px 5px;
    transition: 0.3s;

    &:hover {
      background-color: ${palette.violet[2]};
    }
  `

  const { index } = useParams()
  const history = useHistory()
  const editNotice: StudyNotice =
    StudyStore.studyGroup.noticeDTOList[Number(index)]

  const state = useLocalStore<CreatedNotice>(() => ({
    title: editNotice.title,
    contents: editNotice.content,
    onChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
      state[e.target.name] = e.target.value
    }
  }))

  const clickCancelBtn = () => {
    if (window.confirm('게시물 수정을 취소하시겠습니까?')) {
      history.goBack()
    }
  }

  const clickEditBtn = () => {
    editNotice.title = state.title
    editNotice.content = state.contents
    StudyStore.editNotice(editNotice)
    history.goBack()
  }

  console.log(editNotice)
  return (
    <div>
      <div css={upper}>
        <div css={title}>✏️&nbsp;게시글 수정</div>
      </div>
      <div css={content}>
        <div css={top}>
          <TextArea
            rows={1}
            defaultValue={state.title}
            name="title"
            id="title"
            onChange={state.onChangeTextarea}
          />
        </div>
        <div css={bottom}>
          <TextArea
            rows={10}
            defaultValue={state.contents}
            name="contents"
            id="contents"
            onChange={state.onChangeTextarea}
          />
        </div>
      </div>
      <div css={btnGroup}>
        <button css={cancel} onClick={clickCancelBtn}>
          취소
        </button>
        <button css={ok} onClick={clickEditBtn}>
          등록
        </button>
      </div>
    </div>
  )
}

export default StudyGroupBoardEdit
