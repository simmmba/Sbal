import React, { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon, Empty, Rate } from 'antd'
import { StudyMember } from './StudyGroupType'
import { useObserver } from 'mobx-react'
import StudyStore from '../../stores/StudyStore'

const Attendance = () => {
  const content = css`
    display: flex;
    background: #f4fcff;
    border-radius: 10px;
    margin-bottom: 2px;
    /* height: 50px; */
    /* cursor: pointer; */

    &:hover {
      background-color: #e6f7ff;
    }
  `
  const list = css`
    display: flex;
    margin-bottom: 2px;
  `
  const listNickname = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-right: 2px dashed #fff;
    width: 100%;
  `
  const num = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    margin: 10px 0px 10px 20px;
    border-right: 2px dashed #fff;
    width: 40px;
    /* font-weight: bold; */
  `
  const nickname = css`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    padding: 10px 20px 10px 22px;
    font-weight: bold;
    font-size: 14px;
    /* width: 100%; */
  `

  const score = css`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding: 10px 20px 10px 20px;
    /* width: 250px; */
  `

  const empty = css`
    /* border: 1px solid black; */
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  const top = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    padding-bottom: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
  `

  const box = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `

  return useObserver(() => (
    <div>
      <h2 css={top}>멤버 점수</h2>
      <div>
        {/* {StudyStore.studyGroup.studyMemberDTOList.length > 0 ? (
          <div css={list}>
            <div css={num}>순번</div>
            <div css={listNickname}>닉네임</div>
            <div css={score}>평가</div>
          </div>
        ) : (
          <div></div>
        )} */}
        {StudyStore.studyGroup.studyMemberDTOList.length > 0 ? (
          StudyStore.studyGroup.studyMemberDTOList.map(
            (m: StudyMember, index: number) => (
              <div css={content} key={m.user.id}>
                <div css={num}>{index + 1}</div>
                <div css={box}>
                  <div css={nickname}>{m.user.nickname}</div>
                  <Rate
                    css={score}
                    character={<Icon type="smile" theme="filled" />}
                    // style={{ fontSize: 10 }}
                  />
                </div>
              </div>
            )
          )
        ) : (
          <Empty
            css={empty}
            description={
              <h3>
                <br />
                멤버가 아직 없네요 😢
              </h3>
            }
          />
        )}
      </div>
    </div>
  ))
}

export default Attendance
