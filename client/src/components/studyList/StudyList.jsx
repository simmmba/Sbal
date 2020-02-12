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

const StudyList = () => {
  const studyList = [
    {
      id: 1,
      state: 0,
      title: '백엔드 구축 스터디',
      startDate: '2020-01-02',
      endDate: '2020-01-31',
      currentMember: 0,
      maxMember: 5,
      city: '서울시',
      town: '강남구',
      category: 'IT',
      frequency: 2,
      time: '오전',
      isOnline: true
    },
    {
      id: 2,
      state: 0,
      title: 'GSAT 인적성',
      startDate: '2020-02-02',
      endDate: '2020-02-15',
      currentMember: 2,
      maxMember: 4,
      city: '서울시',
      town: '용산구',
      category: '취업',
      frequency: 3,
      time: '오후',
      isOnline: false
    }
  ]

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
              studyList.map(list => (
                <>
                  <Tr css={choose}>
                    <Td css={d}>{list.category}</Td>
                    <Td css={title}>
                      <NavLink
                        activeStyle={activeStyle}
                        to={`study/details/${list.id}`}
                        active
                      >
                        {list.title}
                      </NavLink>
                    </Td>
                    <Td css={d}>
                      {list.startDate} ~ {list.endDate}
                    </Td>
                    <Td css={d}>{list.isOnline ? '온라인' : '오프라인'}</Td>
                    <Td css={d}>
                      {list.city} {list.town}
                    </Td>
                    <Td css={d}>주 {list.frequency}회</Td>
                    <Td css={d}>{list.time}</Td>
                    <Td css={d}>
                      {list.currentMember} / {list.maxMember}
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
