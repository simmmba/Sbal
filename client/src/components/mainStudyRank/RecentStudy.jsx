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

const RecentStudy = () => {
  const recentList = [
    {
      lno: 1,
      ltype: '자소서',
      lname: 'SK그룹 자소서 미리 작성'
    },
    {
      lno: 2,
      ltype: '자소서',
      lname: '삼성전자 자소서 뽀개기'
    },
    {
      lno: 3,
      ltype: '자소서',
      lname: '블라인드 자소서 스킬'
    },
    {
      lno: 4,
      ltype: '자소서',
      lname: '한번에 붙는 자소서 쓰기'
    },
    {
      lno: 5,
      ltype: '자소서',
      lname: '떨어진 자소서 다시보기'
    }
  ]

  const [list, setList] = useState(recentList)

  return (
    <div css={listBox}>
      <div css={listTitle}>최근 개설된 스터디</div>
      <StudyRank list={list} />
    </div>
  )
}

export default RecentStudy
