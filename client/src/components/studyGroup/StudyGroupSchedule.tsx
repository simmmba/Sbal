import React, { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon, Empty, Modal } from 'antd'
import { StudySchedule } from './StudyGroupType'
import ScheduleAdd from './ScheduleAdd'
import ScheduleEdit from './ScheduleEdit'
import Score from './Score'
import { useObserver } from 'mobx-react'
import StudyStore from '../../stores/StudyStore'
import UserStore from '../../stores/UserStore'
import { useHistory } from 'react-router'

const StudyGroupSchedule = () => {
  const history = useHistory()
  const studyScheduleList = StudyStore.studyGroup.studyScheduleDTOList

  const main = css`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-content: center; */
    /* border: 1px solid black; */
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
    color: #004584;
    /* padding: 0px 17px 0px 5px; */
  `

  const content = css`
    display: flex;
    background: #f4fcff;
    border-radius: 10px;
    margin-bottom: 2px;
    padding: 10px 0px 10px 0px;
    /* flex-wrap: wrap; */
    /* justify-content: space-between; */

    &:hover {
      background-color: #e6f7ff;
    }
  `

  const left = css`
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
    padding: 10px 10px 10px 10px;
    border-right: 2px dashed #fff;
    font-weight: bold;
    width: 80px;
  `

  const middle = css`
    display: flex;
    flex-direction: column;
    /* border: 1px solid black; */
    padding: 0px 10px 0px 20px;
    justify-content: center;
    min-width: 500px;

    &:hover {
      cursor: pointer;
    }
  `

  const right = css`
    display: flex;
    /* border: 1px solid black; */
    padding: 5px 10px 0px 20px;
    justify-content: flex-end;
    align-items: center;
  `

  const box = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  `

  // const cnt = css`
  //   display: flex;
  //   justify-content: center;
  //   font-weight: bold;
  // `

  const subject = css`
    font-weight: bold;
    font-size: 18px;
  `

  const homework = css`
    padding-left: 6px;
  `

  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const add = css`
    background-color: #fff;
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
    width: 130px;
    height: 30px;
    transition: 0.3s;

    &:hover {
      background-color: #b2ccff;
    }
  `

  const btn = css`
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: navy;
    background: #d9e5ff;
    border-radius: 7px;
    width: 50px;
    height: 25px;
    transition: 0.3s;

    &:hover {
      background-color: #b2ccff;
    }
  `

  const empty = css`
    /* border: 1px solid black; */
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  // 스케줄 클릭시 출석 관리 폼 활성화
  const [scoreVisible, setScoreVisible] = useState(false)
  const [scoreConfirmLoading, setScoreConfirmLoading] = useState(false)

  const showScoreModal = () => {
    setScoreVisible(true)
  }

  const handleScoreOk = () => {
    setScoreConfirmLoading(true)
    setTimeout(() => {
      setScoreVisible(false)
      setScoreConfirmLoading(false)
    }, 2000)
  }

  const handleScoreCancel = () => {
    setScoreVisible(false)
  }

  // const clickUpdateSchedule = (id: number): void => {
  //   StudyStore.deleteStudySchedule(Number(id))
  // }

  const clickDeleteSchedule = (id: number): void => {
    StudyStore.deleteStudySchedule(Number(id))
  }

  return useObserver(() => (
    <div css={main}>
      <div css={upper}>
        <div css={title}>
          <Icon
            css={icon}
            type="schedule"
            style={{ fontSize: 24 }}
            theme="twoTone"
            twoToneColor="navy"
          />
          &nbsp;스터디 스케줄
        </div>
        {studyScheduleList.length > 0 ? <ScheduleAdd /> : <div></div>}
      </div>
      {studyScheduleList.length > 0 ? (
        studyScheduleList.map((s: StudySchedule, index: number) => (
          <div css={content} key={s.id}>
            <div css={left}>{index + 1}회차</div>
            <div css={box}>
              <div css={middle} onClick={showScoreModal}>
                <div css={subject}>{s.subject}</div>
                <div css={homework}>
                  <b>시간 )</b> {s.meetDate.substr(0, 4)}년{' '}
                  {s.meetDate.substr(5, 2)}월 {s.meetDate.substr(8, 2)}일{' '}
                  {s.meetDate.substr(11, 2)}시 {s.meetDate.substr(14, 2)}분
                </div>
                <div css={homework}>
                  <b>장소 )</b> {s.location}
                </div>
                <div css={homework}>
                  <b>준비사항 )</b> {s.homework}
                </div>
              </div>

              {/* 평가 모달 */}
              <Modal
                visible={scoreVisible}
                onOk={handleScoreOk}
                confirmLoading={scoreConfirmLoading}
                onCancel={handleScoreCancel}
                cancelText="취소"
                okText="확인"
                destroyOnClose={true}
                width={500}
              >
                <Score />
              </Modal>

              {UserStore.loginUser.id === StudyStore.studyGroup.leader.id ? (
                <div css={right}>
                  <ScheduleEdit />
                  &nbsp;&nbsp;
                  <button css={btn} onClick={() => clickDeleteSchedule(s.id)}>
                    삭제
                  </button>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        ))
      ) : (
        <Empty
          css={empty}
          description={
            <h3>
              <br />
              등록된 스케줄이 없습니다 😮
            </h3>
          }
        >
          <button css={add}>
            스케줄 추가&nbsp;&nbsp;
            <Icon
              css={icon}
              type="plus-circle"
              style={{ fontSize: 20 }}
              theme="twoTone"
              twoToneColor="navy"
            />
          </button>
        </Empty>
      )}
    </div>
  ))
}

export default StudyGroupSchedule
