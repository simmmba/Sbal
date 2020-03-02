import React from 'react'
import { useObserver, useLocalStore } from 'mobx-react'
import UserDetailStore from '../../stores/UserDetailStore'
import { Interest, LedStudy, JoinedStudy } from './UserDetailTypes'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Display } from '../Display'

import { useHistory } from 'react-router'
import { Progress, message } from 'antd'

import UserStore from '../../stores/UserStore'
import palette from '../../lib/styles/palette'

const btn = css`
  color: #747474;
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

  &:hover {
    background: ${palette.violet[2]};
  }
`

const table = css`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 50px;
`

const top = css`
  display: flex;
  padding: 30px 0px 40px 0px;
`

const left = css`
  display: flex;
  flex-direction: column;
  margin: 5px 50px 0px 50px;

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
`

const img = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;

  @media (max-width: 815px) {
    width: 100px;
    height: 100px;
  }
`

const nickname = css`
  font-size: 25px;
  font-weight: bold;
  padding-right: 20px;
  color: ${palette.violet[9]};
`

const editBtn = css`
  color: #747474;
  background: ${palette.violet[1]};
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  width: 100px;
  padding: 4px 0px 4px 0px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 5px;

  &:hover {
    background: ${palette.violet[2]};
  }
`

const logoutBtn = css`
  color: #747474;
  background: ${palette.violet[1]};
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  width: 70px;
  height: 25px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 5px;
  padding: 4px 0px 4px 0px;

  &:hover {
    background: ${palette.violet[2]};
  }

  @media screen and (min-width: 815px) {
    display: none;
  }
`

const btnBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const hoverTr = css`
  text-align: center;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  color: #5d5d5d;
  padding: 5px;

  &:hover {
    background-color: ${palette.violet[0]};
  }
`

const hover = css`
  text-align: center;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  color: #5d5d5d;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${palette.violet[0]};
    font-weight: bold;
  }
`
const joinRequestCount = css`
  font-size: 12px;
  color: #ff5e00;
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

const UserDetail = () => {
  const history = useHistory()
  const clickedUpdateButton = () => {
    history.push('/mypage/update')
  }
  const passwordUpdateButton = () => {
    history.push('/mypage/update/password')
  }
  const dis = css`
    display: none;
  `
  const inputFile = () => {
    let inputFile = document.getElementById('inputFile')
    inputFile?.click()
  }

  const state = useLocalStore(() => ({
    onChange(f: any) {
      let type = f[0].name.substring(f[0].name.lastIndexOf('.') + 1)
      type = type.toLowerCase()
      if (
        type !== 'jpg' &&
        type !== 'jpeg' &&
        type !== 'gif' &&
        type !== 'png' &&
        type !== 'bmp'
      ) {
        message.error('이미지 형식만 업로드 가능합니다.')
        return
      }
      const formData = new FormData()
      formData.append('file', f[0])
      UserDetailStore.upload(formData)
    }
  }))

  return useObserver(() => (
    <Display>
      <div css={top}>
        <div css={left}>
          <form id="form">
            <label
              onClick={() => {
                inputFile()
              }}
            >
              <img
                css={img}
                src={
                  'http://13.124.98.149/images/' +
                  UserDetailStore.data.profilePhotoDir
                }
                alt="프로필사진"
              />
            </label>
            <input
              id="inputFile"
              css={dis}
              name="file"
              type="file"
              onChange={e => state.onChange(e.target.files)}
            />
          </form>
          {UserDetailStore.data.id + '' === sessionStorage.getItem('id') && (
            <div css={btnBox}>
              {UserDetailStore.data.id + '' ===
                sessionStorage.getItem('id') && (
                <div
                  css={css`
                    color: grey;
                    font-size: 12px;
                    margin-top: 7px;
                    width: 180px;
                    text-align: center;

                    @media (max-width: 815px) {
                      width: 100px;
                    }
                  `}
                >
                  * 프로필사진 클릭 → 사진 변경
                </div>
              )}
              <button css={editBtn} onClick={() => clickedUpdateButton()}>
                회원정보 수정
              </button>
              {/* 카카오 로그인이 아닐 때만 비밀번호 변경 가능 */}
              {UserDetailStore.data.socialLogin === null && (
                <button css={editBtn} onClick={() => passwordUpdateButton()}>
                  비밀번호 변경
                </button>
              )}
              <button
                css={logoutBtn}
                onClick={() => {
                  UserStore.logout(history)
                }}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>

        <div css={right}>
          <div css={first}>
            <div css={nickname}>{UserDetailStore.data.nickname}</div>
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
                  <span key={index}>
                    <b>#{interest.scategory}&nbsp;&nbsp;</b>
                  </span>
                )
              )}
            </div>
          </div>
          <span css={comment}>
            <div>
              <b>
                <u>한마디</u>
                <Emoji label="comment" symbol="💬" />
              </b>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <b>{UserDetailStore.data.introduction}</b>
            </div>
          </span>
        </div>
      </div>

      <div>
        {UserDetailStore.data.id + '' === sessionStorage.getItem('id') && (
          <div>
            <div>
              <h2
                css={css`
                  color: ${palette.violet[9]};
                  font-weight: bold;
                `}
              >
                내 스터디
                <span
                  css={css`
                    font-size: 12px;
                    color: #5d5d5d;
                  `}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Emoji label="crown" symbol="👑" />
                  내가 개설한 스터디
                </span>
              </h2>
              {UserDetailStore.data.ledStudyList.length === 0 ? (
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;현재 스터디가 없습니다.
                  <br />
                  <br />
                  <br />
                </div>
              ) : (
                <table css={table}>
                  <tbody>
                    <tr>
                      <th css={th}> 상태</th>
                      <th css={th}> 스터디명</th>
                      <th css={th}> 진행 기간</th>
                      <th css={th}> 인원</th>
                    </tr>
                    {UserDetailStore.data.ledStudyList.map(
                      (ledStudy: LedStudy, index: number) => (
                        <tr css={hoverTr} key={index}>
                          {ledStudy.state === 0 && <td css={td}> 모집 중 </td>}
                          {ledStudy.state === 1 && <td css={td}> 진행 중 </td>}
                          {ledStudy.state === 2 && <td css={td}> 종 료 </td>}
                          <td
                            css={hover}
                            onClick={() => {
                              history.push(`study/${ledStudy.id}`)
                            }}
                          >
                            {' '}
                            <Emoji label="crown" symbol="👑" />
                            &nbsp; {ledStudy.title}
                            {ledStudy.joinRequestCount > 0 ? (
                              <span css={joinRequestCount}>
                                &nbsp;&nbsp;[{ledStudy.joinRequestCount}]
                              </span>
                            ) : (
                              <span />
                            )}
                          </td>
                          <td css={td}>
                            {' '}
                            {ledStudy.startDate} ~ {ledStudy.endDate}{' '}
                          </td>
                          <td css={td}>
                            {' '}
                            {ledStudy.joinedMemberCount} /{' '}
                            {ledStudy.maxParticipants}{' '}
                          </td>
                        </tr>
                      )
                    )}
                    {UserDetailStore.data.joinedStudyList.map(
                      (joinedStudy: JoinedStudy, index: number) => (
                        <tr css={hoverTr} key={index}>
                          {joinedStudy.state === 1 &&
                            joinedStudy.study.state === 0 && (
                              <td css={td}> 모집 중 </td>
                            )}
                          {joinedStudy.state === 1 &&
                            joinedStudy.study.state === 1 && (
                              <td css={td}> 진행 중 </td>
                            )}
                          {joinedStudy.state === 1 &&
                            joinedStudy.study.state === 2 && (
                              <td css={td}> 종 료 </td>
                            )}
                          {joinedStudy.state === 1 && (
                            <td
                              css={hover}
                              onClick={() => {
                                history.push(`study/${joinedStudy.study.id}`)
                              }}
                            >
                              {' '}
                              {joinedStudy.study.title}{' '}
                            </td>
                          )}
                          {joinedStudy.state === 1 && (
                            <td css={td}>
                              {' '}
                              {joinedStudy.study.startDate} ~{' '}
                              {joinedStudy.study.endDate}{' '}
                            </td>
                          )}
                          {joinedStudy.state === 1 && (
                            <td css={td}>
                              {' '}
                              {joinedStudy.study.joinedMemberCount} /{' '}
                              {joinedStudy.study.maxParticipants}{' '}
                            </td>
                          )}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <h2
              css={css`
                color: ${palette.violet[9]};
                font-weight: bold;
              `}
            >
              스터디 요청
            </h2>
            {UserDetailStore.data.joinedStudyList.length === 0 ? (
              <div>&nbsp;&nbsp;&nbsp;&nbsp;요청중인 스터디가 없습니다.</div>
            ) : (
              <table css={table}>
                <tbody>
                  <tr>
                    <th css={th}>상태</th>
                    <th css={th}> 스터디명</th>
                    <th css={th}> 진행 기간</th>
                    <th css={th} />
                  </tr>

                  {UserDetailStore.data.joinedStudyList.map(
                    (joinedStudy: JoinedStudy, index: number) => (
                      <tr css={hoverTr} key={index}>
                        {joinedStudy.state === 0 && <td css={td}> 요청 중 </td>}
                        {joinedStudy.state === 2 && <td css={td}> 거절 </td>}
                        {(joinedStudy.state === 0 ||
                          joinedStudy.state === 2) && (
                          <td
                            css={hover}
                            onClick={() => {
                              history.push(
                                `study/details/${joinedStudy.study.id}`
                              )
                            }}
                          >
                            {' '}
                            {joinedStudy.study.title}{' '}
                          </td>
                        )}
                        {(joinedStudy.state === 0 ||
                          joinedStudy.state === 2) && (
                          <td css={td}>
                            {' '}
                            {joinedStudy.study.startDate} ~{' '}
                            {joinedStudy.study.endDate}{' '}
                          </td>
                        )}
                        {joinedStudy.state === 0 && (
                          <td css={td}>
                            <button
                              css={btn}
                              onClick={() => {
                                UserDetailStore.deleteStudyMember(
                                  joinedStudy.study.id,
                                  index
                                )
                              }}
                            >
                              {' '}
                              요청취소{' '}
                            </button>{' '}
                          </td>
                        )}
                        {joinedStudy.state === 2 && (
                          <td css={td}>
                            <button
                              css={btn}
                              onClick={() => {
                                UserDetailStore.deleteStudyMember(
                                  joinedStudy.study.id,
                                  index
                                )
                              }}
                            >
                              {' '}
                              삭제하기{' '}
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </Display>
  ))
}

export default UserDetail
