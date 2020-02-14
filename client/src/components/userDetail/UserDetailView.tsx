import {useEffect} from 'react'
import {useObserver} from 'mobx-react'
import UserDetailStore from '../../stores/UserDetailStore'
import {Interest,LedStudy, JoinedStudy } from '../userDetail/UserDetailTypes'
import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { Display } from '../Display'

const UserDetail = () => {
    useEffect(() => {UserDetailStore.mypage()}, [])
    //JSON.stringify(UserStore.data);


    const btn = css`
    color: #5d5d5d;
    background: #faecc5;
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    /* padding: 5px 15px 5px 15px; */
    /* margin: 0px 0px 0px 2px; */
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
    /* padding-bottom: 100px; */
    /* float: left; */
    width: 100%;
    
  `

  const top = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* border: 1px solid black; */
  /* margin-left: 100px; */
  /* width: 60%; */
`

const content = css`
  display: flex;
  justify-content: space-between;
  /* justify-content: space-around; */
  flex-wrap: wrap;
`

const main = css`
  /* font-weight: bold; */
  /* font-size: 30px; */
  /* border: 1px solid black; */
  display: flex;
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








    return useObserver(() => (
        <div>
            <Display>
            <div>
             <div>{UserDetailStore.data.nickname}</div>
    <span>참여중인 스터디 :  {UserDetailStore.data.joinedStudyList.length} </span> <span> 개설중인 스터디 : {UserDetailStore.data.ledStudyList.length}</span><br />
    <span>성실도 : {UserDetailStore.data.evaluation}</span> <br />
    <span>관심사 : {UserDetailStore.data.interestDTOList.map(
        (interest: Interest, index: number) => (
            <span key={index}> {interest.scategory} </span>
        )
    )}</span> <br />
    <span>한 마디 : {UserDetailStore.data.introduction}</span>
    </div>

    <div>
        <hr />
        <h2>내 스터디 목록</h2>
        <hr />
        <table css={table}>
            <tr><th css={th}>진행 여부 </th><th css={th}> 스터디명 </th><th css={th}> 진행 기간 </th><th css={th}> 인원 </th></tr>
        
            {UserDetailStore.data.ledStudyList.map(
            (LedStudy: LedStudy, index: number) => (
                <tr key={index}>
                { LedStudy.state === 0 && <td css={td}> 모집 중 </td>}
                { LedStudy.state === 1 && <td css={td}> 진행 중 </td>}
                { LedStudy.state === 2 && <td css={td}> 종 료 </td>}
                <td css={td}> 내가 만든거 -> {LedStudy.title} </td>
                <td css={td}> {LedStudy.startDate} ~ {LedStudy.endDate} </td>
                <td css={td}> {LedStudy.joinedMemberCount}/{LedStudy.maxParticipants} </td>
                </tr>
            )
        )}
            {UserDetailStore.data.joinedStudyList.map(
                (JoinedStudy:JoinedStudy , index : number) => (
                       
                        <tr key={index}>
                        {JoinedStudy.state===1 && JoinedStudy.study.state===0 && <td css={td}> 모집 중  </td>}
                        {JoinedStudy.state===1 && JoinedStudy.study.state===1 && <td css={td}> 진행 중 </td>}
                        {JoinedStudy.state===1 && JoinedStudy.study.state===2 && <td css={td}> 종 료 </td>}
                        {JoinedStudy.state===1 &&  <td css={td}> {JoinedStudy.study.title} </td> }
                        {JoinedStudy.state===1 &&  <td css={td}> {JoinedStudy.study.startDate} ~ {JoinedStudy.study.endDate} </td> }
                        {JoinedStudy.state===1 &&  <td css={td}> {JoinedStudy.study.joinedMemberCount}/{JoinedStudy.study.maxParticipants} </td> } 
                        </tr>  
    
                )
            )}

        </table>
        </div>

        <div>
        <hr />
        <h2>스터디 요청 목록</h2>
        <hr />
        <table css={table}>
            <tr><th css={th}>요청 상태 </th><th css={th}> 스터디명 </th><th css={th}> 진행 기간 </th><th css={th}></th></tr>
            
     
            {UserDetailStore.data.joinedStudyList.map(
            (JoinedStudy: JoinedStudy, index: number) => (
                
            (<tr key={index}>
                { JoinedStudy.state === 0  && <td css={td}> 요청 중 </td> }
                { JoinedStudy.state === 2 && <td css={td}> 거 절 </td>  }
                { (JoinedStudy.state === 0 || JoinedStudy.state === 2) && <td css={td}> {JoinedStudy.study.title} </td> }
                { (JoinedStudy.state === 0 || JoinedStudy.state === 2) && <td css={td}> {JoinedStudy.study.startDate} ~ {JoinedStudy.study.endDate} </td> }
                { JoinedStudy.state === 0  && <td css={td}><button css={btn} onClick={()=> {UserDetailStore.deleteStudyMember(JoinedStudy.study.id,index)}}> 요청취소 </button> </td> }
                { JoinedStudy.state === 2 && <td css={td}><button css={btn}  onClick={()=>  {UserDetailStore.deleteStudyMember(JoinedStudy.study.id,index)}}>  삭제하기  </button></td>  }
                 </tr>)   
            )
        )}
        
        </table>
        </div>
        </Display>
        </div>
    ))
}

export default UserDetail