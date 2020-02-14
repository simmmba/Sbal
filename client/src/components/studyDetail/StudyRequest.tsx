import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import {studyMember} from '../studyDetail/StudyDetailTypes'
import StudyDetailStore from '../../stores/StudyDetailStore'
import {useObserver} from 'mobx-react'

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
    padding-left: 30px;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    color: #353535;
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
  width : 45%;
  `
  const w30 = css`
  border-top: 4px solid #ddd;
  border-bottom: 2px solid #ddd;
  color: grey;
  padding: 7px;
  text-align: center;
  width : 30%;
  `
  const w25 = css`
  border-top: 4px solid #ddd;
  border-bottom: 2px solid #ddd;
  color: grey;
  padding: 7px;
  text-align: center;
  width : 25%;
  `


  return useObserver(() => (
    <div css={bottom}>
      <table css={table}>
        <tr>
          <td colSpan={3} css={title}>
            참여 요청 ( {StudyDetailStore.studyRequest} )
          </td>
        </tr>
        <tr>
          <th css={w45}>
            닉네임
          </th>
          <th  css={w25}>
            성실도
          </th>
          <th css={w30}></th>
        </tr>
        {StudyDetailStore.data.studyMemberDTOList.map(
          (studyMember : studyMember, index : number) => (
           
             
          <tr>
          {studyMember.state === 0 && <td css={nickname}>{studyMember.user.nickname}</td>}
          {studyMember.state === 0 &&  <td css={nickname}>{studyMember.user.evaluation}</td>}
           {studyMember.state === 0 &&   <td css={td}>
              <div css={btnBox}>
                <button css={approveBtn} onClick={()=>{StudyDetailStore.accept(StudyDetailStore.data.id, studyMember.user.id)}}>수락</button>
                <button css={denyBtn}>거절</button>
              </div>
            </td>}
          </tr>
      
       
            ))}
      </table>
    </div>
  ))
}

export default StudyRequest
