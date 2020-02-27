import React, { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Empty, Modal, Progress, Avatar } from 'antd'
import { StudyMember } from './StudyGroupType'
import { useObserver } from 'mobx-react'
import StudyStore from '../../stores/StudyStore'
import UserDetailStore from '../../stores/UserDetailStore'
import { Interest } from '../userDetail/UserDetailTypes'
import palette from '../../lib/styles/palette'

const StudyGroupMember = () => {
  const main = css`
    display: flex;
    flex-direction: column;
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
  const list = css`
    display: flex;
    margin-bottom: 2px;
  `
  const listNickname = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 20px 10px 22px;
    border-right: 2px dashed #fff;
    width: 100%;
  `
  const num = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px 10px 5px;
    border-right: 2px dashed #fff;
    width: 100px;
  `
  const state = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    font-size: 14px;
    width: 200px;
    border-left: 2px dashed #fff;
  `
  const evaluation = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px 10px 5px;
    font-size: 14px;
    width: 150px;
  `
  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const empty = css`
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  const nickname = css`
    display: flex;
    align-items: center;
    padding: 10px 20px 10px 22px;
    font-weight: bold;
    font-size: 14px;
    border-right: 2px dashed #fff;
    width: 100%;
  `
  const memberInfoBtn = css`
    color: #5d5d5d;
    border: none;
    display: flex;
    background-color: transparent;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      font-weight: bold;
    }
  `

  const img = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;

    @media (max-width: 415px) {
      width: 200px;
      height: auto;
      margin-bottom: 10px;
    }
  `

  const left = css`
    display: flex;
    flex-direction: column;
    margin: 5px 30px 0px 10px;

    @media (max-width: 415px) {
      margin: 0px 10px 0px 0px;
    }
  `

  const right = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin: 0px 10px 0px 0px;
  `

  const detailNickname = css`
    font-size: 25px;
    font-weight: bold;
    padding-right: 20px;
  `

  const top = css`
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding-top: 20px;
    margin-bottom: 20px;

    @media (max-width: 415px) {
      display: flex;
      flex-wrap: wrap;
    }
  `

  const text = css`
    font-size: 16px;
    padding-right: 30px;
  `
  const first = css`
    display: flex;
    margin-bottom: 10px;
  `

  const second = css`
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;
  `

  const comment = css`
    display: flex;
    font-size: 16px;
    flex-wrap: wrap;
    margin-top: 10px;
  `

  // 멤버 이름 클릭시
  const [visible, setVisible] = useState(false)

  const showModal = (id: number) => {
    UserDetailStore.userInfo(id)
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return useObserver(() => (
    <div css={main}>
      {/* 멤버 클릭 모달 */}
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <div css={top}>
          <div css={left}>
            <Avatar
              css={img}
              src={
                'http://13.124.98.149/images/' +
                UserDetailStore.data.profilePhotoDir
              }
              alt="프로필"
            />
          </div>
          <div css={right}>
            <div css={first}>
              <div css={detailNickname}>{UserDetailStore.data.nickname}</div>
            </div>
            <div css={second}>
              <span css={text}>
                참여중인 스터디&nbsp;&nbsp;
                <b>
                  {UserDetailStore.data.ledStudyList.length +
                    UserDetailStore.joinCount}
                </b>
              </span>
              <span css={text}>
                개설한 스터디&nbsp;&nbsp;
                <b>{UserDetailStore.data.ledStudyList.length}</b>
              </span>
            </div>
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068'
              }}
              percent={UserDetailStore.data.evaluation}
              status="active"
            />
            {UserDetailStore.data.interestDTOList.length > 0 && (
              <div css={comment}>
                <div>
                  <b>
                    <u>관심사</u>✍️&nbsp;&nbsp;&nbsp;
                  </b>
                </div>
                <div>
                  {UserDetailStore.data.interestDTOList.map(
                    (interest: Interest, index: number) => (
                      <span key={index}>#{interest.scategory}&nbsp;&nbsp;</span>
                    )
                  )}
                </div>
              </div>
            )}
            {UserDetailStore.data.introduction !== '' && (
              <span css={comment}>
                <div>
                  <b>
                    <u>한마디</u>💬
                  </b>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div>{UserDetailStore.data.introduction}</div>
              </span>
            )}
          </div>
        </div>
      </Modal>
      <div css={upper}>
        <div css={title}>😃&nbsp;스터디 멤버</div>
      </div>
      {StudyStore.studyGroup.studyMemberDTOList.length > 0 ? (
        <div css={list}>
          <div css={num}>번호</div>
          <div css={listNickname}>닉네임</div>
          <div css={evaluation}>성실도</div>
          <div css={state}>상태</div>
        </div>
      ) : (
        <div></div>
      )}
      {StudyStore.studyGroup.studyMemberDTOList.length > 0 ? (
        StudyStore.studyGroup.studyMemberDTOList.map(
          (m: StudyMember, index: number) => (
            <div css={content} key={m.user.id}>
              <div css={num}>{index + 1}</div>
              <div css={nickname}>
                <button
                  css={memberInfoBtn}
                  onClick={() => showModal(m.user.id)}
                >
                  {m.user.nickname}
                </button>
              </div>
              {/* <div css={attendance}>{m.user.id}</div> */}
              <div css={evaluation}>{m.user.evaluation}</div>
              <div css={state}>{m.state === 1 ? '가입' : '요청중'}</div>
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
  ))
}

export default StudyGroupMember
