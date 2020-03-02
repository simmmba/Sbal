/** @jsx jsx */
import { useState } from 'react'
import { css, jsx } from '@emotion/core'
import { Modal, Progress, Avatar } from 'antd'
import StudyDetailStore from '../../stores/StudyDetailStore'
import UserDetailStore from '../../stores/UserDetailStore'
import { studyMember } from '../studyDetail/StudyDetailTypes'
import { useObserver } from 'mobx-react'
import { Interest } from '../userDetail/UserDetailTypes'
import palette from '../../lib/styles/palette'

const StudyMember = () => {
  const btn = css`
    color: #5d5d5d;
    background: ${palette.violet[1]};
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    width: 70px;
    height: 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${palette.violet[2]};
    }
  `

  const table = css`
    border-collapse: collapse;
    width: 350px;
  `

  const title = css`
    font-size: 20px;
    padding: 10px 10px 10px 15px;
    font-weight: bold;
    border-bottom: 2px solid #ddd;
    color: #5d5d5d;
  `

  const th = css`
    border-top: 4px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: grey;
    padding: 7px;
    text-align: center;
  `

  const td = css`
    text-align: center;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: #5d5d5d;
    padding: 5px;
    background: #fff;
    font-size: 14px;
    height: 30px;
  `

  const top = css`
    padding-bottom: 30px;
  `
  const w30 = css`
    border-top: 4px solid #ddd;
    border-bottom: 2px solid #ddd;
    width: 30%;
    color: grey;
    padding: 7px;
    text-align: center;
  `
  const w70 = css`
    border-top: 4px solid #ddd;
    border-bottom: 2px solid #ddd;
    width: 70%;
    color: grey;
    padding: 7px;
    text-align: center;
  `

  const memberInfoBtn = css`
    color: #5d5d5d;
    background: #fff;
    font-size: 14px;
    width: 100%;
    height: 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      font-weight: bold;
    }
  `

  const detailNickname = css`
    font-size: 25px;
    font-weight: bold;
    padding-right: 20px;
  `

  const modalTop = css`
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding-top: 20px;
    margin-bottom: 20px;

    @media (max-width: 415px) {
      display: flex;
      flex-wrap: wrap;
    }
  `

  const text = css`
    font-size: 16px;
    padding-right: 30px;
  `
  const first = css`
    display: flex;
    margin-bottom: 10px;
  `

  const second = css`
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;
  `

  const comment = css`
    display: flex;
    font-size: 16px;
    flex-wrap: wrap;
    margin-top: 10px;
  `

  const img = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;

    @media (max-width: 415px) {
      width: 200px;
      height: auto;
      margin-bottom: 10px;
    }
  `

  const left = css`
    display: flex;
    flex-direction: column;
    margin: 5px 30px 0px 10px;

    @media (max-width: 415px) {
      margin: 0px 10px 0px 0px;
    }
  `

  const right = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin: 0px 10px 0px 0px;
  `

  const explain = css`
    font-size: 12px;
  `

  const Emoji = (props: {
    label: string | undefined
    symbol: React.ReactNode
  }) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {props.symbol}
    </span>
  )

  // 멤버 이름 클릭시
  const [visible, setVisible] = useState(false)

  const showModal = (id: number) => {
    UserDetailStore.userInfo(id)
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return useObserver(() => (
    <div css={top}>
      <table css={table}>
        <tbody>
          <tr>
            <td colSpan={2} css={title}>
              <span
                css={css`
                  color: ${palette.violet[9]};
                `}
              >
                스터디 멤버 ( {StudyDetailStore.studyMember} )
              </span>
              <span css={explain}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Emoji label="crown" symbol="👑" />
                리더&nbsp;&nbsp;
                <Emoji label="me" symbol="🙋‍♂️" />
                본인
              </span>
            </td>
          </tr>
          <tr>
            <th css={w70}>닉네임</th>
            <th css={w30}></th>
          </tr>

          {StudyDetailStore.data.studyMemberDTOList.map(
            (studyMember: studyMember, index: number) => (
              <tr key={index}>
                {/* 본인일 때 */}
                {studyMember.state === 1 &&
                  studyMember.user.id + '' === sessionStorage.getItem('id') && (
                    <td css={td}>
                      {/* 본인이 리더일 때 */}
                      {studyMember.user.id ===
                        StudyDetailStore.data.leader.id && (
                        <span role="img" aria-label={''}>
                          <Emoji label="crown" symbol="👑" />
                          &nbsp;
                        </span>
                      )}
                      <Emoji label="me" symbol="🙋‍♂️" />
                      &nbsp;{studyMember.user.nickname}
                    </td>
                  )}

                {studyMember.state === 1 &&
                  studyMember.user.id + '' === sessionStorage.getItem('id') && (
                    <td css={td} />
                  )}
              </tr>
            )
          )}

          {StudyDetailStore.data.studyMemberDTOList.map(
            (studyMember: studyMember, index: number) => (
              <tr key={index}>
                {/* 본인이 아닐 때 */}
                {studyMember.state === 1 &&
                  studyMember.user.id + '' !== sessionStorage.getItem('id') && (
                    <td css={td}>
                      <button
                        css={memberInfoBtn}
                        onClick={() => showModal(studyMember.user.id)}
                      >
                        {/* 본인이 아닌 사람이 리더일 때 */}
                        {studyMember.user.id ===
                          StudyDetailStore.data.leader.id && (
                          <span>
                            <Emoji label="crown" symbol="👑" />
                            &nbsp;
                          </span>
                        )}
                        {studyMember.user.nickname}
                      </button>
                    </td>
                  )}
                {studyMember.state === 1 &&
                  studyMember.user.id + '' !== sessionStorage.getItem('id') && (
                    <td css={td}>
                      {studyMember.user.id !==
                        StudyDetailStore.data.leader.id &&
                        StudyDetailStore.data.leader.id + '' ===
                          sessionStorage.getItem('id') && (
                          <button
                            css={btn}
                            onClick={() => {
                              StudyDetailStore.updateStudyMember(
                                StudyDetailStore.data.id,
                                studyMember.user.id,
                                3
                              )
                            }}
                          >
                            내보내기
                          </button>
                        )}
                    </td>
                  )}
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* 멤버 클릭 모달 */}
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
      >
        <div css={modalTop}>
          <div css={left}>
            <Avatar
              css={img}
              src={
                'http://13.124.98.149/images/' +
                UserDetailStore.data.profilePhotoDir
              }
              alt="프로필"
            />
          </div>
          <div css={right}>
            <div css={first}>
              <div css={detailNickname}>{UserDetailStore.data.nickname}</div>
            </div>
            <div css={second}>
              <span css={text}>
                참여중인 스터디&nbsp;&nbsp;
                <b>
                  {UserDetailStore.data.ledStudyList.length +
                    UserDetailStore.joinCount}
                </b>
              </span>
              <span css={text}>
                개설한 스터디&nbsp;&nbsp;
                <b>{UserDetailStore.data.ledStudyList.length}</b>
              </span>
            </div>
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068'
              }}
              percent={UserDetailStore.data.evaluation}
              status="active"
            />
            {UserDetailStore.data.interestDTOList.length > 0 && (
              <div css={comment}>
                <div>
                  <b>
                    <u>관심사</u>
                    <Emoji label="interest" symbol="✍️" />
                    &nbsp;&nbsp;&nbsp;
                  </b>
                </div>
                <div>
                  {UserDetailStore.data.interestDTOList.map(
                    (interest: Interest, index: number) => (
                      <span key={index}>#{interest.scategory}&nbsp;&nbsp;</span>
                    )
                  )}
                </div>
              </div>
            )}
            {UserDetailStore.data.introduction !== '' && (
              <span css={comment}>
                <div>
                  <b>
                    <u>한마디</u>
                    <Emoji label="comment" symbol="💬" />
                  </b>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div>{UserDetailStore.data.introduction}</div>
              </span>
            )}
          </div>
        </div>
      </Modal>
    </div>
  ))
}

export default StudyMember
