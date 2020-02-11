import React from 'react'
import StudyMember from './StudyMember'
import StudyRequest from './StudyRequest'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
// import styled from '@emotion/styled'
import { Display } from '../Display'
import { FaEye } from 'react-icons/fa'

import { Descriptions } from 'antd'

const StudyDetails = props => {
  const study = [
    {
      title: 'React 스터디',
      contents: 'Front-end 구축 스터디입니다. 많이 지원해주세요!',
      leader: 'seongho',
      lCategory: 'IT',
      sCategory: '프론트엔드',
      city: '경기도',
      town: '의정부시',
      state: 1,
      maxPeople: 5,
      currentPeople: 2,
      hits: 10,
      isOnline: 0,
      monthOrWeek: 2,
      frequency: 2,
      weekOrWeekend: 2,
      timeSlot: 0,
      evaluationLimit: 70,
      startDate: '2020-02-10',
      endDate: '2020-03-01',
      openDate: '2020-02-01'
    }
  ]

  const top = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* border: 1px solid black; */
    /* margin-left: 100px; */
    /* width: 60%; */
  `

  const content = css`
    display: flex;
    justify-content: space-between;
    /* justify-content: space-around; */
    flex-wrap: wrap;
  `

  const main = css`
    /* font-weight: bold; */
    /* font-size: 30px; */
    /* border: 1px solid black; */
    display: flex;
  `

  const title = css`
    /* width: 100%; */
    font-weight: bold;
    font-size: 30px;
    color: #113000;
    text-align: left;
    /* border: 1px solid black; */
    margin-left: 10px;
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
    /* border: 1px solid black; */
    text-align: left;
    font-size: 13px;
    color: gray;
    /* padding: 0 0 5px 5px; */
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
    /* border: 1px solid black; */
    /* width: 350px; */
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  `

  const middle = css`
    /* border: 1px solid black; */
    width: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    display: flex;
    justify-content: center;
    /* align-items: center; */
  `

  const bottom = css`
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    flex-wrap: wrap;
    /* border: 1px solid black; */
    width: 100%;
  `

  return (
    <Display>
      <center>
        {study.map(s => (
          <div>
            <br />
            <br />
            <div css={top}>
              <div css={main}>
                <div css={hit}>
                  <FaEye size="18" color="#747474" />
                  {s.hits}
                </div>
                <div css={title}>{s.title}</div>
              </div>
              <div>
                <div css={btnBox}>
                  <button
                    css={btn}
                    disabled={s.state === 0}
                    onClick={() => alert('신청되었습니다.')}
                  >
                    {s.state === 0 ? '마감' : '신청'}
                  </button>
                  <button css={btn}>개설자버튼</button>
                  <button css={btn}>탈퇴버튼</button>
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
                  <Descriptions.Item label="인원">
                    {s.currentPeople} / {s.maxPeople}
                  </Descriptions.Item>
                  <Descriptions.Item label="리더">{s.leader}</Descriptions.Item>
                  <Descriptions.Item label="분야">
                    {s.lCategory} / {s.sCategory}
                  </Descriptions.Item>
                  <Descriptions.Item label="방식">
                    {s.isOnline === 0 ? '오프라인' : '온라인'}
                  </Descriptions.Item>
                  <Descriptions.Item label="지역">
                    {s.city} {s.town}
                  </Descriptions.Item>
                  <Descriptions.Item label="기간">
                    {s.startDate} ~ {s.endDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="횟수">
                    {s.monthOrWeek === 1 ? '월' : '주'} {s.frequency}회
                  </Descriptions.Item>
                  <Descriptions.Item label="요일">
                    {s.weekOrWeekend === 0
                      ? '평일'
                      : s.weekOrWeekend === 1
                      ? '주말'
                      : s.weekOrWeekend === 2
                      ? '평일 & 주말'
                      : '협의'}
                  </Descriptions.Item>
                  <Descriptions.Item label="시간">
                    {s.timeSlot === 0
                      ? '오전'
                      : s.timeSlot === 1
                      ? '오후'
                      : s.timeSlot === 2
                      ? '저녁'
                      : '협의'}
                  </Descriptions.Item>
                  <Descriptions.Item label="성실도">
                    {s.evaluationLimit} 이상
                  </Descriptions.Item>
                  <Descriptions.Item label="내용">
                    {s.contents}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div css={bottom}>
                <StudyMember />
                <StudyRequest />
              </div>
            </div>
          </div>
        ))}
      </center>
    </Display>
  )
}

export default StudyDetails
