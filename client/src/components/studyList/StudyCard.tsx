/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Card, Avatar } from 'antd'
import { Study } from './StudyTypes'
import moment from 'moment'

const cardStyle = css`
  width: 300px;
  border: 1px solid #cc5de8;
  border-radius: 10px;
  padding: 15px;
`

const titleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid gray;
`

const titleStyle = css`
  font-weight: bold;
`

function StudyCard({ study }: { study: Study }) {
  const { Meta } = Card

  return (
    <div css={cardStyle}>
      <div css={titleContainer}>
        <span css={titleStyle}>{study.title}</span>
        <span>
          {study.joinedMemberCount} / {study.maxParticipants}
        </span>
      </div>
      <div>
        <span>리더</span>
        <Avatar icon="user" />
        <span>{study.leader.nickname}</span>
      </div>
      <div>
        <span>
          published {moment(study.enrollDate, 'YYYY-MM-DD').fromNow()}
        </span>
      </div>
    </div>
  )
}

export default StudyCard
