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

const MyStudy = () => {
  const myList = [
    {
      rank: 1,
      id: 10,
      type: '면접',
      title: '요기요 2차 면접 스터디'
    },
    {
      rank: 2,
      id: 20,
      type: '인적성',
      title: 'GSAT 스터디'
    },
    {
      rank: 3,
      id: 30,
      type: '면접',
      title: '삼성전자 DS 원데이'
    },
    {
      rank: 4,
      id: 40,
      type: '면접',
      title: 'SK C&C 임원 면접 대비'
    }
  ]

  const [list, setList] = useState(myList)

  return (
    <div css={listBox}>
      <div css={listTitle}>내가 진행중인 스터디</div>
      <StudyRank list={list} />
    </div>
  )
}

export default MyStudy
