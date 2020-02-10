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
      rank: 1,
      id: 11,
      type: '자소서',
      title: 'SK그룹 자소서 미리 작성'
    },
    {
      rank: 2,
      id: 21,
      type: '자소서',
      title: '삼성전자 자소서 뽀개기'
    },
    {
      rank: 3,
      id: 31,
      type: '자소서',
      title: '블라인드 자소서 스킬'
    },
    {
      rank: 4,
      id: 41,
      type: '자소서',
      title: '한번에 붙는 자소서 쓰기'
    },
    {
      rank: 5,
      id: 51,
      type: '자소서',
      title: '떨어진 자소서 다시보기'
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
