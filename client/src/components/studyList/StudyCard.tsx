/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import palette from '../../lib/styles/palette'
import { Avatar } from 'antd'
import { Study } from './StudyTypes'
import moment from 'moment'
import { CalenderIcon, PlaceIcon, StarIcon } from '../common/Icons'

moment.locale('ko')

const cardStyle = css`
  width: 280px;
  min-width: 250px;
  /* border: 1px solid ${palette.violet[3]}; */
  /* border: none; */
  border-radius: 30px;
  padding: 15px;
  color: white;
  
  background: ${palette.violet[3]};
  margin: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
  }
  @media screen and (max-width: 815px) {
    width: 100%;
    min-width: 100%;
  }
`

const titleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  text-shadow: 1px 1px 2px ${palette.violet[9]};
  margin-bottom: 20px;
`
const marginThree = css`
  margin-right: 3px;
`

const titleStyle = css`
  font-weight: bold;
  font-size: 1.08rem;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: white;
  color: black;
  padding: 5px;
  border-radius: 25px;
  margin-bottom: 10px;
`

const footerContainerLeft = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  text-shadow: 1px 1px 2px ${palette.violet[9]};
`
const categoryStyle = css`
  background: ${palette.yellow[3]};
  border-left: 10px solid ${palette.yellow[6]};
  padding: 0 5px;
  margin-bottom: 3px;
  color: black;
`

const footerContainerRight = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-shadow: 1px 1px 2px ${palette.violet[9]};
`
const containerRight = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

function StudyCard({
  study,
  onClick
}: {
  study: Study
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const timeslotMap: { [key: string]: string } = {
    1: '오전 시간대',
    2: '오후 시간대',
    3: '저녁 시간대',
    0: '시간 협의'
  }

  return (
    <button css={cardStyle} onClick={onClick}>
      <div css={containerRight}>
        <span css={categoryStyle}>
          {study.lcategory} > {study.scategory}
        </span>
      </div>
      <div css={titleContainer}>
        <span css={titleStyle}>
          {study.title.length > 10
            ? study.title.slice(0, 11) + '...'
            : study.title}
        </span>
        <span>
          {study.joinedMemberCount} / {study.maxParticipants}
        </span>
      </div>
      <div>
        <Row>
          <CalenderIcon css={marginThree} />
          <span>
            {study.monthOrWeek === 0 || !study.monthOrWeek
              ? '일정 협의'
              : study.monthOrWeek === 1
              ? `월 ${study.frequency}회`
              : `주 ${study.frequency}회 `}{' '}
            / {timeslotMap[study.timeslot]}
          </span>
        </Row>
        <Row>
          <PlaceIcon css={marginThree} />
          <span>
            {study.isOnline ? '온라인' : `${study.city} ${study.town}`}
          </span>
        </Row>
        <Row>
          <StarIcon css={marginThree} />
          <span>{`성실도 제한 ${study.evaluationLimit} 이상`}</span>
        </Row>
      </div>
      <div>
        <div css={footerContainerLeft}>
          <Avatar
            icon="user"
            css={css`
              margin-right: 5px;
            `}
          />
          <span>{study.leader.nickname} (리더)</span>
        </div>
      </div>
      <div css={footerContainerRight}>
        <span>{moment(study.enrollDate, 'YYYY-MM-DD').fromNow()}...</span>
      </div>
    </button>
  )
}

export default StudyCard
