/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import '../../css/SuperResponsiveTableStyle.css'
import LoadingSpin from '../common/LoadingSpin'
import StudyCard from './StudyCard'
import { Study } from '../studyList/StudyTypes'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const empty = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  margin-top: 50px;
`
const link = css`
  margin: 10px 0px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  border-radius: 7px;
  width: 150px;
  height: 30px;
  transition: 0.3s;
  /* border: 2px solid #e5dbff; */
  background: #e5dbff;

  &:hover {
    background-color: #f3f0ff;
  }
`

const StudyList = ({ studyList }: { studyList: Study[] }) => {
  const history = useHistory()
  return (
    <div
      css={css`
        display: flex;
        padding: 0 10em;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 40px;
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
        <div css={empty}>
          <span className="emoji" role="img" aria-label={'^^'}>
            해당하는 스터디가 존재하지 않아요 😅
          </span>
          지금 스터디를 시작하시겠어요?
          <Link css={link} to="/study/create">
            스터디 만들기
          </Link>
        </div>
      )}
    </div>
  )
}

export default StudyList
