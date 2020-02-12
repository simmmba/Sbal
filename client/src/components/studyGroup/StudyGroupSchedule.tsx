import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

const StudyGroupSchedule = () => {
  const schedule = [
    {
      id: 1,
      datd: '2020-02-01',
      subject: '자기소개'
    },
    {
      id: 2,
      datd: '2020-02-08',
      subject: '프로젝트 소개'
    },
    {
      id: 3,
      datd: '2020-02-15',
      subject: '자기소개'
    },
    {
      id: 4,
      datd: '2020-02-22',
      subject: '자기소개'
    },
    {
      id: 5,
      datd: '2020-02-29',
      subject: '자기소개'
    },
    {
      id: 6,
      datd: '2020-03-07',
      subject: '자기소개'
    },
    {
      id: 7,
      datd: '2020-02-14',
      subject: '자기소개'
    }
  ]

  const table = css`
    border-collapse: collapse;
    border: 1px solid black;
  `
  const main = css`
    display: flex;
    justify-content: center;
  `

  return (
    <div css={main}>
      스터디 스케줄
      <div></div>
    </div>
  )
}

export default StudyGroupSchedule
