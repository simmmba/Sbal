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
      rank: 1,
      id: 12,
      type: '면접',
      title: '요기요 2차 면접 스터디'
    },
    {
      rank: 2,
      id: 22,
      type: '기업분석',
      title: '엔테크 인턴 스터디'
    },
    {
      rank: 3,
      id: 32,
      type: '면접',
      title: '삼성전자 DS 원데이'
    },
    {
      rank: 4,
      id: 42,
      type: '면접',
      title: 'SK C&C 임원 면접 대비'
    },
    {
      rank: 5,
      id: 52,
      type: '어학',
      title: '오픽 스터디'
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
