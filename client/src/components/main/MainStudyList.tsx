/** @jsx jsx */
import { useEffect } from 'react'
import { jsx, css } from '@emotion/core'
import StudyStore from '../../stores/StudyStore'
import StudyRank from './StudyRank'

const studyRank = css`
  display: flex;
  justify-content: space-around;
  background-color: rgb(236, 236, 236);
  padding: 20px;
  flex-wrap: wrap;
`

function MainStudyList() {
  useEffect(() => {
    StudyStore.fetchMainStudyList()
  })
  return (
    <div css={studyRank}>
      <StudyRank title="myStudy" list={StudyStore.myStudy} />
      <StudyRank title="recentStudy" list={StudyStore.recentStudy} />
      <StudyRank title="famousStudy" list={StudyStore.famousStudy} />
    </div>
  )
}

export default MainStudyList
