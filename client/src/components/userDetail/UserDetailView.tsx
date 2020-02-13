import {useEffect} from 'react'
import {useObserver} from 'mobx-react'
import UserDetailStore from '../../stores/UserDetailStore'
import {Interest, LedStudy, JoinedStudy} from '../userDetail/UserDetailTypes'
import React from 'react'
import Button from "../common/Button";
import {useHistory} from 'react-router';
const UserDetail = () => {
    useEffect(() => {
        UserDetailStore.mypage()
    }, [])
    const history = useHistory();
    return useObserver(() => (
        <div>
            <div>
                <Button onClick={()=>history.push("/mypage/update")}>정보 수정</Button>
                <div>{UserDetailStore.data.nickname}</div>
                <span>참여중인 스터디 : {UserDetailStore.data.joinedStudyList.length} </span>
                <span> 개설중인 스터디 : {UserDetailStore.data.ledStudyList.length}</span><br/>
                <span>성실도 : {UserDetailStore.data.evaluation}</span> <br/>
                <span>관심사 : {UserDetailStore.data.interestDTOList.map(
                    (interest: Interest, index: number) => (
                        <span key={index}> {interest.scategory} </span>
                    )
                )}</span> <br/>
                <span>한 마디 : {UserDetailStore.data.introduction}</span>
            </div>
            <div>
                <hr/>
                <h2>내 스터디 목록</h2>
                <hr/>
                <div>
                    <span>진행 여부 </span><span> 스터디명 </span><span> 진행 기간 </span><span> 인원 </span>
                </div>
                <div>
                    {UserDetailStore.data.ledStudyList.map(
                        (ledStudy: LedStudy, index: number) => (
                            <div key={index}>
                                <span> {ledStudy.state} </span>
                                <span> {ledStudy.title} </span>
                                <span> {ledStudy.startDate} ~ {ledStudy.endDate} </span>
                                <span> {ledStudy.joinedMemberCount}/{ledStudy.maxParticipants} </span>
                            </div>
                        )
                    )}
                    {UserDetailStore.data.joinedStudyList.map(
                        (joinedStudy: JoinedStudy, index: number) => (
                            <div key={index}>
                                {joinedStudy.state === 1 ?
                                    (<div key={index}>
                                        <span> {joinedStudy.study.state} </span>
                                        <span> {joinedStudy.study.title} </span>
                                        <span> {joinedStudy.study.startDate} ~ {joinedStudy.study.endDate} </span>
                                        <span> {joinedStudy.study.joinedMemberCount}/{joinedStudy.study.maxParticipants} </span>
                                    </div>) : (<div/>)

                                }
                            </div>
                        )
                    )}
                </div>
            </div>
            <div>
                <hr/>
                <h2>스터디 요청 목록</h2>
                <hr/>
                <div>
                    <span>요청 상태 </span><span> 스터디명 </span><span> 진행 기간 </span>

                </div>
                <div>
                    {UserDetailStore.data.joinedStudyList.map(
                        (joinedStudy: JoinedStudy, index: number) => (
                            <div key={index}>
                                {joinedStudy.state === 0 || joinedStudy.state === 2 ?
                                    (<div key={index}>
                                        <span> {joinedStudy.state} </span>
                                        <span> {joinedStudy.study.title} </span>
                                        <span> {joinedStudy.study.startDate} ~ {joinedStudy.study.endDate} </span>
                                    </div>) : (<div/>)
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