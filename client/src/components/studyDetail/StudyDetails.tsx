import React from 'react'
import { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import StudyInfo from './StudyInfo'
import StudyMember from './StudyMember'
import StudyRequest from './StudyRequest'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Display } from '../Display'
import StudyDetailStore from '../../stores/StudyDetailStore'
import { Modal } from 'antd'
import { useHistory } from 'react-router'
import CreateForm from '../studyList/CreateForm'
import palette from '../../lib/styles/palette'

const StudyDetails = () => {
  useEffect(() => {
    StudyDetailStore.studyDetail()
  }, [])

  const history = useHistory()

  const openModal = () => {
    StudyDetailStore.modalVisible = true
  }
  const handleCancel = () => {
    StudyDetailStore.modalVisible = false
  }

  const top = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `

  const content = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `

  const main = css`
    display: flex;
    margin: 5px 0px 5px 0px;
  `

  const title = css`
    font-weight: bold;
    font-size: 30px;
    color: ${palette.violet[9]};
    text-align: left;
    margin-left: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media screen and (max-width: 815px) {
      font-size: 25px;
    }
  `

  const btn = css`
    color: #4c4c4c;
    background: ${palette.violet[0]};
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    padding: 5px 15px 5px 15px;
    margin: 0px 0px 0px 2px;
    width: 90px;
    height: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: ${palette.violet[1]};
    }
  `

  const move = css`
    color: #5d5d5d;
    background: ${palette.violet[1]};
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    margin: 0px 0px 0px 2px;
    height: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #4c4c4c;
      box-shadow: 2px 2px 3px inset;
    }
  `

  const btnBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 5px 0px 5px 0px;
    margin-left: 15px;
  `

  const middle = css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
  `

  const bottom = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 50px;
  `

  const block = css`
    padding: 0px 7px 2px 0px;
    margin-right: 12px;
    border-bottom: 3px solid ${palette.gray[5]};
    border-right: 3px solid ${palette.gray[5]};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: ${palette.gray[9]};
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

  return useObserver(() => (
    <Display>
      <div>
        <br />
        <br />
        <div css={top}>
          <div css={main}>
            <div css={title}>
              <div css={block}>
                &nbsp;
                <Emoji label="hit" symbol="😎" />
                &nbsp;&nbsp;{StudyDetailStore.data.hits}
              </div>
              {StudyDetailStore.data.title}&nbsp;
              {StudyDetailStore.isMember() && (
                <button
                  css={move}
                  onClick={() => {
                    StudyDetailStore.goStudyGroup(
                      StudyDetailStore.data.id,
                      history
                    )
                  }}
                >
                  <span
                    css={css`
                      transition: 0.3s;
                      &:hover {
                        font-size: larger;
                      }
                    `}
                  >
                    <Emoji label="move" symbol="🚴‍♀️" />
                  </span>
                  &nbsp; 그룹 페이지로 이동&nbsp;
                  <span
                    css={css`
                      transition: 0.3s;
                      &:hover {
                        font-size: larger;
                      }
                    `}
                  >
                    <Emoji label="move" symbol="🚴‍♀️" />
                  </span>
                </button>
              )}
            </div>
          </div>
          <div css={btnBox}>
            {!StudyDetailStore.isJoin() &&
            sessionStorage.getItem('id') !==
              StudyDetailStore.data.leader.id + '' &&
            StudyDetailStore.data.state === 0 ? (
              <button
                css={btn}
                onClick={() => {
                  StudyDetailStore.insertMember(StudyDetailStore.data.id)
                }}
              >
                가입신청
              </button>
            ) : (
              StudyDetailStore.isJoin() &&
              sessionStorage.getItem('id') !==
                StudyDetailStore.data.leader.id + '' &&
              StudyDetailStore.isMember() && (
                <button
                  css={btn}
                  onClick={() => {
                    StudyDetailStore.deleteStudyMember(
                      StudyDetailStore.data.id,
                      2
                    )
                  }}
                >
                  탈퇴 요청
                </button>
              )
            )}
            {StudyDetailStore.isJoin() &&
              sessionStorage.getItem('id') !==
                StudyDetailStore.data.leader.id + '' &&
              !StudyDetailStore.isMember() && (
                <button
                  css={btn}
                  onClick={() => {
                    StudyDetailStore.deleteStudyMember(
                      StudyDetailStore.data.id,
                      1
                    )
                  }}
                >
                  신청 취소
                </button>
              )}
            {sessionStorage.getItem('id') ===
              StudyDetailStore.data.leader.id + '' &&
              StudyDetailStore.data.state === 0 && (
                <button
                  css={btn}
                  onClick={() => {
                    StudyDetailStore.studyTodo(1)
                  }}
                >
                  진행
                </button>
              )}
            {sessionStorage.getItem('id') ===
              StudyDetailStore.data.leader.id + '' &&
              StudyDetailStore.data.state === 1 && (
                <button
                  css={btn}
                  onClick={() => {
                    StudyDetailStore.studyTodo(2)
                  }}
                >
                  종료
                </button>
              )}

            {sessionStorage.getItem('id') ===
              StudyDetailStore.data.leader.id + '' && (
              <div>
                <button css={btn} onClick={openModal}>
                  수정
                </button>
                <Modal
                  visible={StudyDetailStore.modalVisible}
                  onCancel={handleCancel}
                  footer={[<div key={StudyDetailStore.data.id} />]}
                >
                  <CreateForm />
                </Modal>
              </div>
            )}
            {sessionStorage.getItem('id') ===
              StudyDetailStore.data.leader.id + '' && (
              <button
                css={btn}
                onClick={() => {
                  StudyDetailStore.deleteStudy(
                    StudyDetailStore.data.id,
                    history
                  )
                }}
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <div css={content}>
          <div css={middle}>
            <StudyInfo />
          </div>
          <div css={bottom}>
            {StudyDetailStore.isMember() ? <StudyMember /> : <div />}
            {StudyDetailStore.data.leader.id + '' ===
              sessionStorage.getItem('id') && <StudyRequest />}
          </div>
        </div>
      </div>
    </Display>
  ))
}

export default StudyDetails
