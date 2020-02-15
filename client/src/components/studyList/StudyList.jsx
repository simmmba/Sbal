/**@jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../../css/SuperResponsiveTableStyle.css'
import { NavLink } from 'react-router-dom'

const t = css`
  border-collapse: collapse;
`

const h = css`
  padding: 12px;
  border-top: 2px solid grey;
  border-bottom: 2px solid #ddd;
  color: grey;
`

const d = css`
  padding: 5px;
  border-bottom: 2px solid #ddd;
  color: #5d5d5d;
  font-size: 14px;
`

const choose = css`
  &:hover {
    background: rgb(236, 236, 236);
  }
`

const title = css`
  text-align: left;
  font-weight: bold;
  padding: 8px;
  border-bottom: 2px solid #ddd;
  color: #5d5d5d;
  font-size: 15px;
`

const upper = css`
  font-size: 15px;
  height: 40px;
`

const StudyList = ({studyList}) => {

    const activeStyle = {
        color: 'red',
        background: 'black'
    }

  return (
    <div>
      <center>
        <Table css={t}>
          <Thead>
            <Tr css={upper}>
              <Th width="10%" css={h}>
                주제
              </Th>
              <Th width="30%" css={h}>
                스터디명
              </Th>
              <Th width="20%" css={h}>
                진행 기간
              </Th>
              <Th width="10%" css={h}>
                진행 방식
              </Th>
              <Th width="10%" css={h}>
                지역
              </Th>
              <Th width="8%" css={h}>
                진행 횟수
              </Th>
              <Th width="5%" css={h}>
                시간
              </Th>
              <Th width="7%" css={h}>
                인원
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {studyList.length > 0 ? (
              studyList.map((study) => (
                <>
                  <Tr css={choose}>
                    <Td css={d}>{study.lcategory}</Td>
                    <Td css={title}>
                      <NavLink
                        activeStyle={activeStyle}
                        to={`study/details/${study.id}`}
                        active
                      >
                        {study.title}
                      </NavLink>
                    </Td>
                    <Td css={d}>
                      {study.startDate} ~ {study.endDate}
                    </Td>
                    <Td css={d}>{study.isOnline ? '온라인' : '오프라인'}</Td>
                    <Td css={d}>
                      {study.city} {study.town}
                    </Td>
                    <Td css={d}>
                      {study.monthOrWeek===0?"협의":study.monthOrWeek===1?"월":"주"} {study.frequency}회
                    </Td>
                    <Td css={d}>{study.timeslot}</Td>
                    <Td css={d}>
                      {study.joinedMemberCount} / {study.maxParticipants}
                    </Td>
                  </Tr>
                </>
              ))
            ) : (
              <div>스터디 없음</div>
            )}
          </Tbody>
        </Table>
      </center>
    </div>
  )
}

export default StudyList
