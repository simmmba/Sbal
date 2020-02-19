import React from 'react'
import { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import StudyMember from './StudyMember'
import StudyRequest from './StudyRequest'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
// import styled from '@emotion/styled'
import { Display } from '../Display'
import { FaEye } from 'react-icons/fa'
import StudyDetailStore from '../../stores/StudyDetailStore'
import UserStore from '../../stores/UserStore'
import { Descriptions, Modal } from 'antd'
import { studyMember } from './StudyDetailTypes'
import { useHistory } from 'react-router'
import CreateForm from '../studyList/CreateForm'
import { NavLink } from 'react-router-dom'
import studyDetailStore from '../../stores/StudyDetailStore'

const StudyDetails = () => {
  useEffect(() => {
    StudyDetailStore.studyDetail()
  }, [])

  const history = useHistory()

  const openModal = () => {
    StudyDetailStore.modalVisible = true
  }
  const handleCancel = () => {
    StudyDetailStore.modalVisible = false
  }

  const top = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `

  const content = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `

  const main = css`
    display: flex;
  `

  const title = css`
    font-weight: bold;
    font-size: 30px;
    color: #113000;
    text-align: left;
    margin-left: 15px;
  `

  const hit = css`
    background: #f6f6f6;
    font-size: 14px;
    border-radius: 100%;
    width: 45px;
    height: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left;
    font-size: 13px;
    color: gray;
  `

  const btn = css`
    color: #4c4c4c;
    background: #e4f7ba;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    padding: 5px 15px 5px 15px;
    margin: 0px 0px 0px 2px;
    width: 100px;
    height: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #cef279;
    }
  `

  const btnBox = css`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  `

  const middle = css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    display: flex;
    justify-content: center;
  `

  const bottom = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  `

  const link = css`
    color: navy;

    &:hover {
      color: navy;
    }
  `

  return useObserver(() => (
    <div>
      <Display>
        <div>
          <br />
          <br />
          <div css={top}>
            <div css={main}>
              <div css={hit}>
                <FaEye size="18" color="#747474" />
                {StudyDetailStore.data.hits}
              </div>
              <div css={title}>
                <NavLink css={link} to={`/study/${studyDetailStore.data.id}`}>
                  {StudyDetailStore.data.title}
                </NavLink>
                {StudyDetailStore.isMember() && <button onClick={() => {StudyDetailStore.goStudyGroup(StudyDetailStore.data.id, history)}}> 스터디그룹 </button> }
              </div>
            </div>
            <div>
              <div css={btnBox}>
                {!StudyDetailStore.isJoin() &&
                sessionStorage.getItem('id') !==
                  StudyDetailStore.data.leader.id + '' &&
                StudyDetailStore.data.state === 0 ? (
                  <button
                    css={btn}
                    onClick={() => {
                      StudyDetailStore.insertMember(StudyDetailStore.data.id)
                    }}
                  >
                    신청
                    {/* {StudyDetailStore.data.state === 0 ? '모집' : '신청'} */}
                  </button>
                ) : (
                  StudyDetailStore.isJoin() &&
                  sessionStorage.getItem('id') !==
                    StudyDetailStore.data.leader.id + '' &&
                  StudyDetailStore.isMember() && (
                    // <button css={btn} onClick={() => alert('신청되었습니다.')}>
                    <button
                      css={btn}
                      onClick={() => {
                        StudyDetailStore.deleteStudyMember(
                          StudyDetailStore.data.id,
                          2
                        )
                      }}
                    >
                      탈퇴 요청
                      {/* {StudyDetailStore.data.state === 0 ? '모집' : '신청'} */}
                    </button>
                  )
                )}
                {StudyDetailStore.isJoin() &&
                  sessionStorage.getItem('id') !==
                    StudyDetailStore.data.leader.id + '' &&
                  !StudyDetailStore.isMember() && (
                    <button
                      css={btn}
                      onClick={() => {
                        StudyDetailStore.deleteStudyMember(
                          //           StudyDetailStore.data.id
                          //         )
                          //       }}
                          //     >
                          //       신청 취소
                          //       {/* {StudyDetailStore.data.state === 0 ? '모집' : '신청'} */}
                          //     </button>
                          //   )}
                          // {sessionStorage.getItem('id') ===
                          //   StudyDetailStore.data.leader.id + '' &&
                          //   StudyDetailStore.data.state !== 1 && (
                          //     <button
                          //       css={btn}
                          //       onClick={() => {
                          //         StudyDetailStore.studyTodo()
                          //       }}
                          //     >
                          //       진행
                          //     </button>
                          //   )}
                          // {sessionStorage.getItem('id') ===
                          //   StudyDetailStore.data.leader.id + '' && (
                          //   <div>
                          //     <button css={btn} onClick={openModal}>
                          //       수정
                          //     </button>
                          //     <Modal
                          //       title="스터디 수정"
                          //       visible={StudyDetailStore.modalVisible}
                          //       onCancel={handleCancel}
                          //       footer={[<div></div>]}
                          //     >
                          //       <CreateForm />
                          //     </Modal>
                          //   </div>
                          StudyDetailStore.data.id,
                          1
                        )
                      }}
                    >
                      신청 취소
                      {/* {StudyDetailStore.data.state === 0 ? '모집' : '신청'} */}
                    </button>
                  )}
                {sessionStorage.getItem('id') ===
                  StudyDetailStore.data.leader.id + '' &&
                  StudyDetailStore.data.state !== 1 && (
                    <button
                      css={btn}
                      onClick={() => {
                        StudyDetailStore.studyTodo()
                      }}
                    >
                      진행
                    </button>
                  )}
                {sessionStorage.getItem('id') ===
                  StudyDetailStore.data.leader.id + '' && (
                  <div>
                    <button css={btn} onClick={openModal}>
                      수정
                    </button>
                    <Modal
                      title="스터디 수정"
                      visible={StudyDetailStore.modalVisible}
                      onCancel={handleCancel}
                      footer={[<div></div>]}
                    >
                      <CreateForm />
                    </Modal>
                  </div>
                )}
                {sessionStorage.getItem('id') ===
                  StudyDetailStore.data.leader.id + '' && (
                  <button
                    css={btn}
                    onClick={() => {
                      StudyDetailStore.deleteStudy(
                        StudyDetailStore.data.id,
                        history
                      )
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          </div>

          <br />
          <div css={content}>
            <div css={middle}>
              <Descriptions
                // title="Responsive Descriptions"
                bordered
                column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="리더">
                  {StudyDetailStore.data.leader.nickname}
                </Descriptions.Item>
                <Descriptions.Item label="인원">
                  {StudyDetailStore.data.joinedMemberCount} /{' '}
                  {StudyDetailStore.data.maxParticipants}
                </Descriptions.Item>
                <Descriptions.Item label="분야">
                  {StudyDetailStore.data.lcategory} /{' '}
                  {StudyDetailStore.data.scategory}
                </Descriptions.Item>
                <Descriptions.Item label="기간">
                  {StudyDetailStore.data.startDate} ~{' '}
                  {StudyDetailStore.data.endDate}
                </Descriptions.Item>
                <Descriptions.Item label="장소">
                  {StudyDetailStore.data.isOnline === false
                    ? StudyDetailStore.data.city +
                      ' ' +
                      StudyDetailStore.data.town
                    : '온라인'}
                </Descriptions.Item>
                <Descriptions.Item label="일정">
                  {StudyDetailStore.data.monthOrWeek === 0
                    ? '추후 협의'
                    : StudyDetailStore.data.monthOrWeek === 1
                    ? '월'
                    : '주'}{' '}
                  {StudyDetailStore.data.frequency}회
                </Descriptions.Item>
                <Descriptions.Item label="시간">
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
                </Descriptions.Item>
                <Descriptions.Item label="성실도">
                  {StudyDetailStore.data.evaluationLimit} 이상
                </Descriptions.Item>
                <Descriptions.Item label="내용">
                  {StudyDetailStore.data.contents}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div css={bottom}>
              {StudyDetailStore.isMember() ? <StudyMember /> : <div></div>}
              {StudyDetailStore.data.leader.id + '' ===
                sessionStorage.getItem('id') && <StudyRequest />}
            </div>
          </div>
        </div>
      </Display>
    </div>
  ))
}

export default StudyDetails
