import {useEffect} from 'react'
import {useObserver} from 'mobx-react'
import UserDetailStore from '../../stores/UserDetailStore'
import {Interest,LedStudy, JoinedStudy } from '../userDetail/UserDetailTypes'
import React from 'react'

const UserDetail = () => {
    useEffect(() => {UserDetailStore.mypage()}, [])
    //JSON.stringify(UserStore.data);
    return useObserver(() => (
        <div>
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
        <div>
            <span>진행 여부 </span><span> 스터디명 </span><span> 진행 기간 </span><span> 인원 </span>
        </div>
        <div>
            {UserDetailStore.data.ledStudyList.map(
            (LedStudy: LedStudy, index: number) => (
                <div key={index}>
                <span> {LedStudy.state} </span>
                <span> {LedStudy.title} </span>
                <span> {LedStudy.startDate} ~ {LedStudy.endDate} </span>
                <span> {LedStudy.joinedMemberCount}/{LedStudy.maxParticipants} </span>
                </div>
            )
        )}
            {UserDetailStore.data.joinedStudyList.map(
                (JoinedStudy:JoinedStudy , index : number) => (
                    <div>
                        {JoinedStudy.state===1 ? 
                        (<div key={index}>
                            <span> {JoinedStudy.study.state} </span>
                            <span> {JoinedStudy.study.title} </span>
                            <span> {JoinedStudy.study.startDate} ~ {JoinedStudy.study.endDate} </span>
                            <span> {JoinedStudy.study.joinedMemberCount}/{JoinedStudy.study.maxParticipants} </span>
                        </div>) : (<div></div>)
                            
                    }
                    </div>
                )
            )}
        </div>
        </div>
        <div>
        <hr />
        <h2>스터디 요청 목록</h2>
        <hr />
        <div>
            <span>요청 상태 </span><span> 스터디명 </span><span> 진행 기간 </span>
            
        </div>
        <div>
            {UserDetailStore.data.joinedStudyList.map(
            (JoinedStudy: JoinedStudy, index: number) => (
                <div>
                    { JoinedStudy.state === 0 || JoinedStudy.state === 2 ? 
                 (<div key={index}>
                 <span> {JoinedStudy.state} </span>
                 <span> {JoinedStudy.study.title} </span>
                 <span> {JoinedStudy.study.startDate} ~ {JoinedStudy.study.endDate} </span>
                 </div>) : (<div></div>)
                 }
                </div>   
            )
        )}
        </div>
        </div>

        </div>
    
    ))
}

export default UserDetail