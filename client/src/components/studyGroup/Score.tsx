import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon, Empty, Rate, message } from 'antd'
import { StudyMember } from './StudyGroupType'
import StudyStore from '../../stores/StudyStore'
import palette from '../../lib/styles/palette'

const Attendance = ({ scheduleIndex }: { scheduleIndex: number }) => {
  const content = css`
    display: flex;
    background: ${palette.violet[0]};
    border-radius: 10px;
    margin-bottom: 2px;
    /* height: 50px; */
    /* cursor: pointer; */
    transition: 0.3s;

    &:hover {
      background-color: ${palette.gray[0]};
      /* border: 1px solid ${palette.violet[1]}; */
    }
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

  const attendanceList =
    StudyStore.studyGroup.studyScheduleDTOList[Number(scheduleIndex)]
      .attendanceDTOList

  function scoreChanged(value: number, tempIndex: number) {
    if (value < 1) {
      message.error('출석 점수는 1점 이상으로 설정해주세요.')
      return
    }
    StudyStore.userScores.push({
      schedule: {
        id: StudyStore.studyGroup.studyScheduleDTOList[Number(scheduleIndex)].id
      },
      user: {
        id: attendanceList[tempIndex].user.id
      },
      state: value * 20
    })
  }
  return (
    <div>
      <h2 css={top}>성실도 점수</h2>
      <small css={top}>
        {StudyStore.loginUser.id === StudyStore.studyGroup.leader.id
          ? '성실도 점수는 출석과 과제 수행 정도, 참여도를 객관적으로 판단하여 반영해주세요.'
          : StudyStore.studyGroup.studyScheduleDTOList[
              scheduleIndex
            ].meetDate.substr(0, 16) + ' 에 진행한 스터디 성실도 점수입니다.'}
      </small>
      <div>
        {attendanceList.length > 0 ? (
          attendanceList.map((sm: StudyMember, index: number) => (
            <div css={content} key={sm.user.id}>
              <div css={num}>{index + 1}</div>
              <div css={box}>
                <div css={nickname}>{sm.user.nickname}</div>
                <Rate
                  css={score}
                  defaultValue={sm.state / 20}
                  allowClear={false}
                  character={<Icon type="star" theme="filled" />}
                  onChange={(value: number) => {
                    scoreChanged(value, index)
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <Empty
            css={empty}
            description={
              <h3>
                <br />
                출석부가 아직 없네요 😢
              </h3>
            }
          />
        )}
      </div>
    </div>
  )
}

export default Attendance
