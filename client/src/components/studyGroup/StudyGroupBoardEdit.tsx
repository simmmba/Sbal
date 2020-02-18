import React, { useEffect } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useParams, useHistory } from 'react-router'
import StudyStore from "../../stores/StudyStore";
import {useLocalStore} from "mobx-react";
import {CreatedNotice, StudyNotice} from "./StudyGroupType";

const StudyGroupBoardEdit = () => {
  const main = css`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-content: center; */
    /* border: 1px solid black; */
  `

  const upper = css`
    display: flex;
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
    flex-direction: column;
    background: #eef7ff;
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
    background: #d1e9ff;
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
  `

  const btn = css`
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
    width: 70px;
    height: 30px;
    margin: 6px 5px 0px 5px;
    transition: 0.3s;

    &:hover {
      background-color: #b2ccff;
    }
  `

  const {index} = useParams();
  const history = useHistory();
  const editNotice: StudyNotice = StudyStore.studyGroup.noticeDTOList[Number(index)];


  const state = useLocalStore<CreatedNotice>(() => ({
        title: editNotice.title,
        contents: editNotice.content,
        onChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
          state[e.target.name] = e.target.value;
        },
      }
  ))

  const clickCancelBtn = () => {
    if(window.confirm("게시물 수정을 취소하시겠습니까?")) {
      history.goBack();
    }
  }

  const clickEditBtn = () => {
    editNotice.title = state.title;
    editNotice.content = state.contents;
    StudyStore.editNotice(editNotice);
    history.goBack();
  }

  console.log(editNotice);
  return (
    <div>
      <div css={upper}>
        <div css={title}>
          <Icon
            css={icon}
            type="snippets"
            style={{ fontSize: 24 }}
            theme="twoTone"
            twoToneColor="navy"
          />
          &nbsp;게시글 수정
        </div>
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
        <button css={btn} onClick={clickCancelBtn}>취소</button>
        <button css={btn} onClick={clickEditBtn}>등록</button>
      </div>
    </div>
  )
}

export default StudyGroupBoardEdit
