/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import '../../css/SuperResponsiveTableStyle.css'
import LoadingSpin from '../common/LoadingSpin'
import StudyCard from './StudyCard'
import { Study } from '../studyList/StudyTypes'

const StudyList = ({ studyList }: { studyList: Study[] }) => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {studyList.length > 0 ? (
        studyList.map((study: Study, index: number) => (
          <StudyCard study={study} key={index} />
        ))
      ) : (
        <LoadingSpin tip="로딩중입니다..." />
      )}
    </div>
  )
}

export default StudyList
