import React, {useState} from 'react'
/**@jsx jsx */
import {css, jsx} from '@emotion/core'
import {Modal, Progress} from 'antd'
import {studyMember} from '../studyDetail/StudyDetailTypes'
import StudyDetailStore from '../../stores/StudyDetailStore'
import UserDetailStore from '../../stores/UserDetailStore'
import {useObserver} from 'mobx-react'
import {Interest} from '../userDetail/UserDetailTypes'

const StudyRequest = () => {

    const approveBtn = css`
    color: #5d5d5d;
    background: #d9e5ff;
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    /* padding: 5px 15px 5px 15px; */
    margin: 0px 0px 0px 3px;
    width: 40px;
    height: 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #b2ccff;
    }
  `

    const denyBtn = css`
    color: #5d5d5d;
    background: #ffd8d8;
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    /* padding: 5px 15px 5px 15px; */
    margin: 0px 0px 0px 3px;
    width: 40px;
    height: 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #ffa7a7;
    }
  `

    const btnBox = css`
    display: flex;
    justify-content: flex-end;
  `

    const table = css`
    border-collapse: collapse;
    /* padding-bottom: 100px; */
    /* float: left; */
    width: 350px;
  `

    const title = css`
    font-size: 20px;
    padding: 10px 10px 10px 15px;
    font-weight: bold;
    /* border-top: 2px solid #ddd; */
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
  `
    const nickname = css`
    color: grey;
    padding: 7px;
    text-align: center;
    width: 45%;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: #353535;
  `

    const evaluation = css`
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: grey;
    padding: 7px;
    text-align: center;
    width: 45%;
  `
    const bottom = css`
    padding-bottom: 20px;
  `

    const w45 = css`
    border-top: 4px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: grey;
    padding: 7px;
    text-align: center;
    width: 45%;
  `
    const w30 = css`
    border-top: 4px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: grey;
    padding: 7px;
    text-align: center;
    width: 30%;
  `
    const w25 = css`
    border-top: 4px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: grey;
    padding: 7px;
    text-align: center;
    width: 25%;
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
      /* background: #ffe08c; */
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
    height: auto;

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
        <div css={bottom}>
            <table css={table}>
                <tbody>
                <tr>
                    <td colSpan={3} css={title}>
                        참여 요청 ( {StudyDetailStore.studyRequest} )
                    </td>
                </tr>
                <tr>
                    <th css={w45}>닉네임</th>
                    <th css={w25}>성실도</th>
                    <th css={w30}/>
                </tr>
                {StudyDetailStore.data.studyMemberDTOList.map(
                    (sm: studyMember, index: number) => (
                        <tr key={index}>
                            {sm.state === 0 && (
                                <td css={nickname}>
                                    <button
                                        css={memberInfoBtn}
                                        onClick={() => showModal(sm.user.id)}
                                    >
                                        {sm.user.nickname}
                                    </button>
                                </td>
                            )}
                            {sm.state === 0 && (
                                <td css={evaluation}>{sm.user.evaluation}</td>
                            )}
                            {sm.state === 0 && (
                                <td css={td}>
                                    <div css={btnBox}>
                                        <button
                                            css={approveBtn}
                                            onClick={() => {
                                                StudyDetailStore.updateStudyMember(
                                                    StudyDetailStore.data.id,
                                                    sm.user.id,
                                                    1
                                                )
                                            }}
                                        >
                                            수락
                                        </button>
                                        <button
                                            css={denyBtn}
                                            onClick={() => {
                                                StudyDetailStore.updateStudyMember(
                                                    StudyDetailStore.data.id,
                                                    sm.user.id,
                                                    2
                                                )
                                            }}
                                        >
                                            거절
                                        </button>
                                    </div>
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
                        <img css={img} src="/images/default1.png" alt="프로필"/>
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
                            <div>{UserDetailStore.data.introduction}</div>
            </span>
                    </div>
                </div>
            </Modal>
        </div>
    ))
}

export default StudyRequest
