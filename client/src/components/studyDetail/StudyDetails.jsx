import React from 'react'
import StudyMember from './StudyMember'
import StudyRequest from './StudyRequest'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'

const StudyDetails = props => {
  const study = [
    {
      title: 'React 스터디',
      contents: 'Front-end 구축 스터디',
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
      endDate: '2020-03-01'
    }
  ]

  const table = css`
    border-collapse: collapse;
    float: left;
  `

  const tr = css``

  const td = css`
    padding: 5px 15px 5px 15px;
  `

  const th = css`
    text-align: right;
    padding: 5px 15px 5px 15px;
    width: 5em;
    font-weight: bold;
  `

  const all = css`
    width: 80%;
    border: 1px solid black;
    /* padding: 0px 10px 0px 10px; */
  `

  const top = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid black;
    /* margin-left: 100px; */
  `

  const content = css`
    display: flex;
    justify-content: space-between;
    /* justify-content: space-around; */
    flex-wrap: wrap;
  `

  const title = css`
    font-weight: bold;
    font-size: 30px;
    border: 1px solid black;
  `

  const hit = css`
    border: 1px solid black;
    text-align: left;
  `

  const btn = css`
    border: 1px solid black;
  `

  const req = css`
    border: 1px solid black;
  `
  const mem = css`
    border: 1px solid black;
  `

  const left = css`
    border: 1px solid black;
    width: 450px;
  `

  const right = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid black;
    width: 300px;
  `

  return (
    <center>
      {/* <div css={all}>
        {study.map(s => (
          <div>
            <br />
            <br />
     
            <div css={top}>
              <div>
                <div css={title}>{s.title}</div>
                <div css={hit}>조회수: {s.hits}</div>
              </div>
              <div css={btn}>
                <p>
                  <button
                    disabled={s.state === 0}
                    onClick={() => alert('신청되었습니다.')}
                  >
                    {s.state === 0 ? '마감' : '신청'}
                  </button>
                </p>
              </div>
            </div>
     

            <br />
            <div css={content}>
              <div css={left}>
                <table border="1" css={table}>
                  <tr>
                    <td css={th}>리더</td>
                    <td>{s.leader}</td>
                  </tr>
                  <tr>
                    <td css={th}>분야</td>
                    <td>
                      {s.lCategory} / {s.sCategory}
                    </td>
                  </tr>
                  <tr>
                    <td css={th}>현재 인원</td>
                    <td>
                      {s.currentPeople} / {s.maxPeople}
                    </td>
                  </tr>
                  <tr>
                    <td css={th}>방식</td>
                    <td>{s.isOnline === 0 ? '오프라인' : '온라인'}</td>
                  </tr>
                  <tr>
                    <td css={th}>지역</td>
                    <td>
                      {s.city} {s.town}
                    </td>
                  </tr>
                  <tr>
                    <td css={th}>내용</td>
                    <td>{s.contents}</td>
                  </tr>
                  <tr>
                    <td css={th}>기간</td>
                    <td>
                      {s.startDate} ~ {s.endDate}
                    </td>
                  </tr>
                  <tr>
                    <td css={th}>횟수</td>
                    <td>
                      {s.monthOrWeek === 1 ? '월' : '주'} {s.frequency}회
                    </td>
                  </tr>
                  <tr>
                    <td css={th}>요일</td>
                    <td>
                      {s.weekOrWeekend === 0
                        ? '평일'
                        : s.weekOrWeekend === 1
                        ? '주말'
                        : s.weekOrWeekend === 2
                        ? '평일 & 주말'
                        : '협의'}
                    </td>
                  </tr>
                  <tr>
                    <td css={th}>시간</td>
                    <td>
                      {s.timeSlot === 0
                        ? '오전'
                        : s.timeSlot === 1
                        ? '오후'
                        : s.timeSlot === 2
                        ? '저녁'
                        : '협의'}
                    </td>
                  </tr>
                  <tr>
                    <td css={th}>성실도</td>
                    <td>{s.evaluationLimit} 이상</td>
                  </tr>
                </table>
              </div>
              <div css={right}>
                <StudyRequest />
                <StudyMember />
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </center>
  )
}

export default StudyDetails
