import { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import UserDetailStore from '../../stores/UserDetailStore'
import { Interest, LedStudy, JoinedStudy } from './UserDetailTypes'
import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Display } from '../Display'
// import Button from '../common/Button'
import { useHistory } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import { Progress } from 'antd'

const UserDetail = () => {
  const history = useHistory()
  // JSON.stringify(UserStore.data);

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

  const clickedUpdateButton = () => {
    // UserDetailStore.mypage();
    history.push('/mypage/update');
  }

  return useObserver(() => (
    <Display>
      <div css={top}>
        <div css={left}>
          <img css={img} src="/images/default1.png" />
          {UserDetailStore.data.id + '' === sessionStorage.getItem('id') && (
            <div css={btnBox}>
              <button
                css={editBtn}
                onClick={() => clickedUpdateButton()}
              >
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
            <div>한마디</div>&nbsp;&nbsp;&nbsp;
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
              <hr />
              <h2>내 스터디 목록</h2>
              <hr />
              <table css={table}>
                <tr>
                  <th css={th}>진행 여부 </th>
                  <th css={th}> 스터디명 </th>
                  <th css={th}> 진행 기간 </th>
                  <th css={th}> 인원 </th>
                </tr>
                {UserDetailStore.data.ledStudyList.map(
                  (LedStudy: LedStudy, index: number) => (
                    <tr key={index}>
                      <Link to={`study/details/${LedStudy.id}`}>
                        {LedStudy.state === 0 && <td css={td}> 모집 중 </td>}
                        {LedStudy.state === 1 && <td css={td}> 진행 중 </td>}
                        {LedStudy.state === 2 && <td css={td}> 종 료 </td>}
                        <td css={td}> 내가 만든거 -> {LedStudy.title} </td>
                        <td css={td}>
                          {' '}
                          {LedStudy.startDate} ~ {LedStudy.endDate}{' '}
                        </td>
                        <td css={td}>
                          {' '}
                          {LedStudy.joinedMemberCount}/
                          {LedStudy.maxParticipants}{' '}
                        </td>
                      </Link>
                    </tr>
                  )
                )}
                {UserDetailStore.data.joinedStudyList.map(
                  (JoinedStudy: JoinedStudy, index: number) => (
                    <tr key={index}>
                      <Link to={`study/details/${JoinedStudy.study.id}`}>
                        {JoinedStudy.state === 1 &&
                          JoinedStudy.study.state === 0 && (
                            <td css={td}> 모집 중 </td>
                          )}
                        {JoinedStudy.state === 1 &&
                          JoinedStudy.study.state === 1 && (
                            <td css={td}> 진행 중 </td>
                          )}
                        {JoinedStudy.state === 1 &&
                          JoinedStudy.study.state === 2 && (
                            <td css={td}> 종 료 </td>
                          )}
                        {JoinedStudy.state === 1 && (
                          <td css={td}> {JoinedStudy.study.title} </td>
                        )}
                        {JoinedStudy.state === 1 && (
                          <td css={td}>
                            {' '}
                            {JoinedStudy.study.startDate} ~{' '}
                            {JoinedStudy.study.endDate}{' '}
                          </td>
                        )}
                        {JoinedStudy.state === 1 && (
                          <td css={td}>
                            {' '}
                            {JoinedStudy.study.joinedMemberCount}/
                            {JoinedStudy.study.maxParticipants}{' '}
                          </td>
                        )}
                      </Link>
                    </tr>
                  )
                )}
              </table>
            </div>

            <hr />
            <h2>스터디 요청 목록</h2>
            <hr />
            <table css={table}>
              <tr>
                <th css={th}>요청 상태 </th>
                <th css={th}> 스터디명 </th>
                <th css={th}> 진행 기간 </th>
                <th css={th}></th>
              </tr>

              {UserDetailStore.data.joinedStudyList.map(
                (JoinedStudy: JoinedStudy, index: number) => (
                  <tr key={index}>
                    <Link to={`study/details/${JoinedStudy.study.id}`}>
                      {JoinedStudy.state === 0 && <td css={td}> 요청 중 </td>}
                      {JoinedStudy.state === 2 && <td css={td}> 거 절 </td>}
                      {(JoinedStudy.state === 0 || JoinedStudy.state === 2) && (
                        <td css={td}> {JoinedStudy.study.title} </td>
                      )}
                      {(JoinedStudy.state === 0 || JoinedStudy.state === 2) && (
                        <td css={td}>
                          {' '}
                          {JoinedStudy.study.startDate} ~{' '}
                          {JoinedStudy.study.endDate}{' '}
                        </td>
                      )}
                      {JoinedStudy.state === 0 && (
                        <td css={td}>
                          <button
                            css={btn}
                            onClick={() => {
                              UserDetailStore.deleteStudyMember(
                                JoinedStudy.study.id,
                                index
                              )
                            }}
                          >
                            {' '}
                            요청취소{' '}
                          </button>{' '}
                        </td>
                      )}
                      {JoinedStudy.state === 2 && (
                        <td css={td}>
                          <button
                            css={btn}
                            onClick={() => {
                              UserDetailStore.deleteStudyMember(
                                JoinedStudy.study.id,
                                index
                              )
                            }}
                          >
                            {' '}
                            삭제하기{' '}
                          </button>
                        </td>
                      )}
                    </Link>
                  </tr>
                )
              )}
            </table>
          </div>
        )}
      </div>
    </Display>
  ))
}

export default UserDetail
