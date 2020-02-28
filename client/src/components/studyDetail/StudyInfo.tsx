import React, { useState, useEffect } from 'react'
import { useObserver } from 'mobx-react'
import StudyMember from './StudyMember'
import StudyRequest from './StudyRequest'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
// import styled from '@emotion/styled'
import { Display } from '../Display'
import StudyDetailStore from '../../stores/StudyDetailStore'
import { Descriptions, Modal, Progress, Avatar } from 'antd'
import { useHistory } from 'react-router'
import CreateForm from '../studyList/CreateForm'
import palette from '../../lib/styles/palette'
import UserDetailStore from '../../stores/UserDetailStore'
import { studyMember } from './StudyDetailTypes'
import { Interest } from '../userDetail/UserDetailTypes'

const StudyInfo = () => {
  const total = css`
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    justify-content: center;
  `

  const block = css`
    padding: 10px 15px 10px 15px;
    margin: 10px;
    background: ${palette.yellow[0]};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    justify-content: space-between;
  `

  const title = css`
    width: 100%;
    border-bottom: 2px solid ${palette.yellow[9]};
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
    margin-bottom: 6px;
    font-weight: bold;
    font-size: 15px;
  `

  const modal = css`
    padding: 10px 15px 10px 15px;
    margin: 10px;
    background: ${palette.yellow[2]};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    justify-content: space-between;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${palette.yellow[3]};
    }
  `

  const detailNickname = css`
    font-size: 25px;
    font-weight: bold;
    padding-right: 20px;
  `

  const modalTop = css`
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

  // 리더 정보 모달
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    UserDetailStore.userInfo(StudyDetailStore.data.leader.id)
    setTimeout(function() {
      setVisible(true)
    }, 1000)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <div>
      <div css={total}>
        <div css={modal} onClick={() => showModal()}>
          <div css={title}>&nbsp;&nbsp;👑 리더&nbsp;&nbsp;</div>
          <div>
            &nbsp;&nbsp;{StudyDetailStore.data.leader.nickname}&nbsp;&nbsp;
          </div>
        </div>
        <div css={block}>
          <div css={title}>&nbsp;&nbsp;👨‍👩‍👧‍👦 인원&nbsp;&nbsp;</div>
          <div>
            {StudyDetailStore.data.joinedMemberCount} /{' '}
            {StudyDetailStore.data.maxParticipants}
          </div>
        </div>
        <div css={block}>
          <div css={title}>&nbsp;&nbsp;🏆 성실도&nbsp;&nbsp;</div>
          <div>
            {StudyDetailStore.data.evaluationLimit === 0 ||
            StudyDetailStore.data.evaluationLimit === null ? (
              <span>무관</span>
            ) : (
              <span>
                &nbsp;&nbsp;{StudyDetailStore.data.evaluationLimit}%
                이상&nbsp;&nbsp;
              </span>
            )}
          </div>
        </div>
        <div css={block}>
          <div css={title}>📖 분야</div>
          <div>
            &nbsp;&nbsp;{StudyDetailStore.data.lcategory} >{' '}
            {StudyDetailStore.data.scategory}&nbsp;&nbsp;
          </div>
        </div>
        <div css={block}>
          <div css={title}>📅 진행 기간</div>
          <div>
            &nbsp;&nbsp;{StudyDetailStore.data.startDate} ~{' '}
            {StudyDetailStore.data.endDate}&nbsp;&nbsp;
          </div>
        </div>
        <div css={block}>
          <div css={title}>&nbsp;&nbsp;🌏 진행 장소(방식)&nbsp;&nbsp;</div>
          <div>
            {!StudyDetailStore.data.isOnline
              ? StudyDetailStore.data.city + ' ' + StudyDetailStore.data.town
              : '온라인'}
          </div>
        </div>
        <div css={block}>
          <div css={title}>&nbsp;&nbsp;⌛️ 일정&nbsp;&nbsp;</div>
          <div>
            &nbsp;&nbsp;
            {StudyDetailStore.data.monthOrWeek === 0
              ? '추후 협의'
              : StudyDetailStore.data.monthOrWeek === 1
              ? '월'
              : '주'}{' '}
            {StudyDetailStore.data.frequency}회&nbsp;&nbsp;
          </div>
        </div>
        <div css={block}>
          <div css={title}>⏰ 시간</div>
          <div>
            &nbsp;&nbsp;
            {StudyDetailStore.data.weekdayOrWeekend === 0
              ? '요일 협의,'
              : StudyDetailStore.data.weekdayOrWeekend === 1
              ? '평일'
              : StudyDetailStore.data.weekdayOrWeekend === 2
              ? '주말'
              : '요일 무관,'}{' '}
            {StudyDetailStore.data.timeslot === 0
              ? '시간 협의'
              : StudyDetailStore.data.timeslot === 1
              ? '오전'
              : StudyDetailStore.data.timeslot === 2
              ? '오후'
              : '저녁'}
            &nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div css={block}>
        <div css={title}>📢 스터디 소개</div>
        <div>{StudyDetailStore.data.contents}</div>
      </div>

      {/* 리더 클릭 모달 */}
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <div css={modalTop}>
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
    </div>
  )
}

export default StudyInfo
