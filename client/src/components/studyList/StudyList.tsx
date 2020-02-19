/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import '../../css/SuperResponsiveTableStyle.css'
import LoadingSpin from '../common/LoadingSpin'
import StudyCard from './StudyCard'
import { Study } from '../studyList/StudyTypes'
import { useHistory } from 'react-router'

const StudyList = ({ studyList }: { studyList: Study[] }) => {
  const history = useHistory()
  return (
    <div
      css={css`
        display: flex;
        padding: 0 10em;
        flex-wrap: wrap;
        justify-content: space-around;
        @media screen and (max-width: 815px) {
          padding: 0 3em;
        }
      `}
    >
      {studyList.length > 0 ? (
        studyList.map((study: Study, index: number) => (
          <StudyCard
            study={study}
            key={index}
            onClick={() => {
              history.push(`/study/details/${study.id}`)
            }}
          />
        ))
      ) : (
        <LoadingSpin tip="로딩중입니다..." />
      )}
    </div>
  )
}

export default StudyList
