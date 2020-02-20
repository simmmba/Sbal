import { useEffect } from 'react'
import { useObserver, useLocalStore } from 'mobx-react'
import UserDetailStore from '../../stores/UserDetailStore'
import { Interest, LedStudy, JoinedStudy } from './UserDetailTypes'
import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Display } from '../Display'
// import Button from '../common/Button'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Progress } from 'antd'
import UserStore from '../../stores/UserStore'

const btn = css`
  color: #5d5d5d;
  background: #faecc5;
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
    background: #ffe08c;
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
  width: 150px;
  height: auto;

  @media (max-width: 415px) {
    width: 100px;
    height: auto;
  }
`

const nickname = css`
  font-size: 25px;
  font-weight: bold;
  padding-right: 20px;
`

const editBtn = css`
  color: #5d5d5d;
  background: #faecc5;
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
  margin-top: 10px;

  &:hover {
    background: #ffe08c;
  }
`

const btnBox = css`
  display: flex;
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

const third = css`
  display: flex;
  font-size: 16px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

const comment = css`
  display: flex;
  font-size: 16px;
  flex-wrap: wrap;
  margin-top: 10px;
`
const flexEnd = css`
  display: flex;
  justify-content: flex-end;
`
const link = css`
  margin: 10px 0px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  border-radius: 7px;
  width: 100px;
  height: 30px;
  transition: 0.3s;
  border: none;
  /* border: 2px solid #e5dbff; */
  background: #e5dbff;

  &:hover {
    background-color: #f3f0ff;
  }
`
const UserDetail = () => {
  const history = useHistory()
  // JSON.stringify(UserStore.data);
  const clickedUpdateButton = () => {
    // UserDetailStore.mypage();
    history.push('/mypage/update')
  }
  const dis = css`
    display: none;
  `
  const inputFile = () => {
    let inputFile = document.getElementById('inputFile')
    inputFile?.click()
  }

  const state = useLocalStore(() => ({
    //filename : "http://13.124.98.149/images/"+ UserDetailStore.data.profilePhotoDir,
    //http://13.124.98.149/images/default.png
    //file : 'http://13.124.98.149/images/default.png',
    onChange(f: any) {
      //this.filename  = "images/"+f[0].name;
      //this.file = e.target.files[0];
      //alert(f[0].type)
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
              />
            </label>
            <input
              id="inputFile"
              css={dis}
              name="file"
              type="file"
              onChange={e => state.onChange(e.target.files)}
            ></input>
          </form>
          {UserDetailStore.data.id + '' === sessionStorage.getItem('id') && (
            <div css={btnBox}>
              <button css={editBtn} onClick={() => clickedUpdateButton()}>
                정보 수정
              </button>
            </div>
          )}
        </div>

        <div css={right}>
          <div css={first}>
            <div css={nickname}>{UserDetailStore.data.nickname}</div>
          </div>
          <div css={second}>
            }))
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
            <div>관심사&nbsp;&nbsp;&nbsp;</div>
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
            <div>한마디</div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <b>{UserDetailStore.data.introduction}</b>
            </div>
          </span>
        </div>
      </div>
      <div css={flexEnd}>
        <button
          css={link}
          onClick={() => {
            UserStore.logout(history)
          }}
        >
          로그아웃
        </button>
      </div>
      <div>
        {UserDetailStore.data.id + '' === sessionStorage.getItem('id') && (
          <div>
            <div>
              <h2>내 스터디</h2>

              <table css={table}>
                <tbody>
                  <tr>
                    <th css={th}></th>
                    <th css={th}> 스터디명</th>
                    <th css={th}> 진행 기간</th>
                    <th css={th}> 인원</th>
                  </tr>
                  {UserDetailStore.data.ledStudyList.map(
                    (ledStudy: LedStudy, index: number) => (
                      <tr
                        key={index}
                        onClick={() => {
                          history.push(`study/details/${ledStudy.id}`)
                        }}
                      >
                        {ledStudy.state === 0 && <td css={td}> 모집 중 </td>}
                        {ledStudy.state === 1 && <td css={td}> 진행 중 </td>}
                        {ledStudy.state === 2 && <td css={td}> 종 료 </td>}
                        <td css={td}> 👑&nbsp; {ledStudy.title} </td>
                        <td css={td}>
                          {' '}
                          {ledStudy.startDate} ~ {ledStudy.endDate}{' '}
                        </td>
                        <td css={td}>
                          {' '}
                          {ledStudy.joinedMemberCount}/
                          {ledStudy.maxParticipants}{' '}
                        </td>
                      </tr>
                    )
                  )}
                  {UserDetailStore.data.joinedStudyList.map(
                    (joinedStudy: JoinedStudy, index: number) => (
                      <tr
                        key={index}
                        onClick={() => {
                          history.push(`study/details/${joinedStudy.study.id}`)
                        }}
                      >
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
                          <td css={td}> {joinedStudy.study.title} </td>
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
                            {joinedStudy.study.joinedMemberCount}/
                            {joinedStudy.study.maxParticipants}{' '}
                          </td>
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <h2>스터디 요청</h2>

            <table css={table}>
              <tbody>
                <tr>
                  <th css={th}></th>
                  <th css={th}> 스터디명</th>
                  <th css={th}> 진행 기간</th>
                  <th css={th} />
                </tr>

                {UserDetailStore.data.joinedStudyList.map(
                  (joinedStudy: JoinedStudy, index: number) => (
                    <tr
                      key={index}
                      onClick={() => {
                        history.push(`study/details/${joinedStudy.study.id}`)
                      }}
                    >
                      {joinedStudy.state === 0 && <td css={td}> 요청 중 </td>}
                      {joinedStudy.state === 2 && <td css={td}> 거 절 </td>}
                      {(joinedStudy.state === 0 || joinedStudy.state === 2) && (
                        <td css={td}> {joinedStudy.study.title} </td>
                      )}
                      {(joinedStudy.state === 0 || joinedStudy.state === 2) && (
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
          </div>
        )}
      </div>
    </Display>
  ))
}

export default UserDetail
