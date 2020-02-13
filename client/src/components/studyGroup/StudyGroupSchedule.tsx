import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from 'antd'

const StudyGroupSchedule = () => {
  const schedule = [
    {
      date: '2020-02-01',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-02',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-03',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-04',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-05',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-06',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-07',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-08',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-09',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    },
    {
      date: '2020-02-10',
      location: '스타벅스',
      subject: '자기소개',
      homework: 'abc'
    }
  ]

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
    cursor: pointer;

    &:hover {
      background-color: #e6f7ff;
    }
  `

  const left = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* border: 1px solid black; */
    padding: 10px 20px 10px 20px;
    border-right: 2px dashed #fff;
  `

  const right = css`
    display: flex;
    flex-direction: column;
    /* border: 1px solid black; */
    padding: 10px 10px 10px 20px;
    justify-content: center;
  `
  const cnt = css`
    display: flex;
    justify-content: center;
    font-weight: bold;
  `
  const date = css`
    display: flex;
    justify-content: center;
    font-size: 13px;
  `
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

  const btn = css`
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

    &:hover {
      background-color: #b2ccff;
    }
  `

  return (
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
        <button css={btn}>
          스케줄 추가&nbsp;&nbsp;
          <Icon
            css={icon}
            type="plus-circle"
            style={{ fontSize: 20 }}
            theme="twoTone"
            twoToneColor="navy"
          />
        </button>
      </div>
      {schedule.reverse().map((s, index) => (
        <div css={content}>
          <div css={left}>
            <div css={cnt}>{schedule.length - index}회차</div>
            <div css={date}>{s.date}</div>
          </div>
          <div css={right}>
            <div css={subject}>{s.subject}</div>
            <div css={homework}>준비사항 : {s.homework}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StudyGroupSchedule
