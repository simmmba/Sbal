import React, { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Empty, Modal, Pagination, message } from 'antd'
import { StudySchedule } from './StudyGroupType'
import ScheduleAdd from './ScheduleAdd'
import ScheduleEdit from './ScheduleEdit'
import Score from './Score'
import { useObserver } from 'mobx-react'
import StudyStore from '../../stores/StudyStore'
import palette from '../../lib/styles/palette'

const StudyGroupSchedule = () => {
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
    color: ${palette.violet[9]};
    /* padding: 0px 17px 0px 5px; */
  `

  const content = css`
    display: flex;
    background: ${palette.violet[0]};
    border-radius: 10px;
    margin-bottom: 2px;
    padding: 20px 20px 20px 0px;
    /* flex-wrap: wrap; */
    /* justify-content: space-between; */
    transition: 0.3s;

    &:hover {
      background: ${palette.gray[0]};
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

  const subject = css`
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 10px;
  `

  const homework = css`
    padding-left: 6px;
  `

  const icon = css`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const btn = css`
    /* background-color: #fff; */
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: ${palette.violet[9]};
    background: ${palette.violet[0]};
    border-radius: 7px;
    height: 25px;
    transition: 0.3s;

    &:hover {
      background-color: ${palette.violet[1]};
    }
  `

  const empty = css`
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
  const pageNation = css`
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  `

  const studyScheduleList = StudyStore.studyGroup.studyScheduleDTOList

  // 스케줄 클릭시 출석 관리 폼 활성화
  const [scoreVisible, setScoreVisible] = useState(false)
  const [scoreConfirmLoading, setScoreConfirmLoading] = useState(false)
  const [attendanceIndex, setAttendanceIndex] = useState(-1)
  const [pageNumber, setPageNumber] = useState(1)
  const handlePageChange = (pn: number) => {
    setPageNumber(pn)
  }
  const pageSize = 4

  const showScoreModal = (scheduleIndex: number) => {
    StudyStore.userScores = []
    const attendanceList =
      StudyStore.studyGroup.studyScheduleDTOList[Number(scheduleIndex)]
        .attendanceDTOList
    attendanceList.map(a => {
      StudyStore.userScores.push({
        schedule: {
          id:
            StudyStore.studyGroup.studyScheduleDTOList[Number(scheduleIndex)].id
        },
        user: {
          id: a.user.id
        },
        state: a.state
      })
    })

    setScoreVisible(true)
    setAttendanceIndex(scheduleIndex)
  }

  const handleScoreOk = () => {
    StudyStore.userScores.map((updatedAttendance: object) => {
      StudyStore.updateAttendance(updatedAttendance)
    })
    message.info('스케줄이 수정되었습니다.')
    setScoreConfirmLoading(true)
    setTimeout(() => {
      setScoreVisible(false)
      setScoreConfirmLoading(false)
    }, 1000)
    StudyStore.userScores = []
  }

  const handleScoreCancel = () => {
    setScoreVisible(false)
  }

  const clickDeleteSchedule = (id: number, index: number): void => {
    if (window.confirm('스케줄을 삭제하시겠습니까?')) {
      StudyStore.deleteStudySchedule(Number(id), Number(index))
    }
  }

  return useObserver(() => (
    <div css={main}>
      <Modal
        visible={scoreVisible}
        onOk={
          StudyStore.loginUser.id === StudyStore.studyGroup.leader.id
            ? handleScoreOk
            : handleScoreCancel
        }
        confirmLoading={scoreConfirmLoading}
        onCancel={handleScoreCancel}
        cancelText="취소"
        okText="확인"
        destroyOnClose={true}
        width={500}
      >
        <Score scheduleIndex={attendanceIndex} />
      </Modal>
      <div css={upper}>
        <div css={title}>📅&nbsp;스터디 스케줄</div>
        {studyScheduleList.length > 0 &&
        StudyStore.loginUser.id === StudyStore.studyGroup.leader.id ? (
          <ScheduleAdd />
        ) : (
          <div />
        )}
      </div>

      {studyScheduleList.length > 0 ? (
        studyScheduleList
          .slice(
            (pageNumber - 1) * pageSize,
            (pageNumber - 1) * pageSize + pageSize
          )
          .map((s: StudySchedule, scheduleIndex: number) => (
            <div css={content} key={s.id}>
              <div css={left}>
                {pageSize * (pageNumber - 1) + scheduleIndex + 1}회차
              </div>
              <div css={box}>
                <div
                  css={middle}
                  onClick={() =>
                    showScoreModal(pageSize * (pageNumber - 1) + scheduleIndex)
                  }
                >
                  <div css={subject}>{s.subject}</div>
                  <div css={homework}>
                    <b>시간 :</b> {s.meetDate.substr(0, 4)}년{' '}
                    {s.meetDate.substr(5, 2)}월 {s.meetDate.substr(8, 2)}일{' '}
                    {s.meetDate.substr(11, 2)}시 {s.meetDate.substr(14, 2)}분
                  </div>
                  <div css={homework}>
                    <b>장소 :</b> {s.location}
                  </div>
                  <div css={homework}>
                    <b>준비사항 :</b> {s.homework}
                  </div>
                </div>

                {StudyStore.loginUser.id === StudyStore.studyGroup.leader.id ? (
                  <div css={right}>
                    <ScheduleEdit
                      sIndex={Number(
                        pageSize * (pageNumber - 1) + scheduleIndex
                      )}
                    />
                    &nbsp;&nbsp;
                    <button
                      css={btn}
                      onClick={() =>
                        clickDeleteSchedule(
                          s.id,
                          Number(pageSize * (pageNumber - 1) + scheduleIndex)
                        )
                      }
                    >
                      삭제 ✂️
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
          {StudyStore.loginUser.id === StudyStore.studyGroup.leader.id ? (
            <ScheduleAdd />
          ) : (
            <div />
          )}
        </Empty>
      )}
      {studyScheduleList.length > pageSize ? (
        <Pagination
          css={pageNation}
          total={studyScheduleList.length}
          onChange={handlePageChange}
          current={pageNumber}
          defaultCurrent={1}
          pageSize={pageSize}
        />
      ) : (
        <div />
      )}
    </div>
  ))
}

export default StudyGroupSchedule
