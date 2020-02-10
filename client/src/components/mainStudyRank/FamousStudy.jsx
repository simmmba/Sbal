import { useState } from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import StudyRank from './StudyRank'

const listBox = css`
  /* width: 650px; */
  /* margin: 10px; */
  border: 1px solid red;
  background-color: white;
  padding: 15px 15px 20px 15px;
  width: 330px;
  border: 10px solid rgb(236, 236, 236);
`
const listTitle = css`
  font-size: 15px;
  font-weight: 900;
  color: grey;
  margin-bottom: 10px;
  /* border: 1px solid skyblue; */
`

const FamousStudy = () => {
  const famousList = [
    {
      lno: 1,
      ltype: '면접',
      lname: '요기요 2차 면접 스터디'
    },
    {
      lno: 2,
      ltype: '기업분석',
      lname: '엔테크 인턴 스터디'
    },
    {
      lno: 3,
      ltype: '면접',
      lname: '삼성전자 DS 원데이'
    },
    {
      lno: 4,
      ltype: '면접',
      lname: 'SK C&C 임원 면접 대비'
    },
    {
      lno: 5,
      ltype: '어학',
      lname: '오픽 스터디'
    }
  ]

  const [list, setList] = useState(famousList)

  return (
    <div css={listBox}>
      <div css={listTitle}>인기 있는 스터디</div>
      <StudyRank list={list} />
    </div>
  )
}

export default FamousStudy
