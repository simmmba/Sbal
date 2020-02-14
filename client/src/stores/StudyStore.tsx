import {observable} from 'mobx'
import * as studyAPI from '../lib/api/study.'
import {StudyGroupType, StudyMember, StudySchedule} from "../components/studyGroup/StudyGroupType";
import UserStore from "./UserStore";

const StudyStore = observable({
    recentStudy: [],
    myStudy: [],
    famousStudy: [],

    studyList: [],
    studyDetail: {},

    studyGroup: {
      id: 0,
      title: "",
      contents: "",
      leader: {
        id: 0,
        nickname: ""
      },
      city: "",
      town: "",
      state: 0,
      maxParticipants: 0,
      hits: 0,
      isOnline: false,
      monthOrWeek: 0,
      timeslot: 0,
      evaluationLimit: 0,
      enrollDate: "",
      startDate: "",
      endDate: "",
      joinedMemberCount: 0,
      lcategory: "",
      scategory: "",

      studyMemberDTOList: [],
      studyScheduleDTOList: [],
    } as StudyGroupType,

    async fetchMainStudyList() {
        try {
            const res = await studyAPI.getMainStudyList()

            if (res.data.value.loginUser) {
                const {
                    loginUser: {joinedStudyList}
                } = res.data.value
                this.myStudy = joinedStudyList
            }

            const {recentlyEnrolled, mostHits} = res.data.value

            this.recentStudy = recentlyEnrolled
            this.famousStudy = mostHits
        } catch (error) {
            alert('데이터를 로드하는 중 요류가 발생했습니다.')
        }
    },


    fetchStudyList() {
    },
    fetchStudyDetail() {
    },

    async fetchStudyGroup(id: number) {
        const res = await studyAPI.getStudyDetails(Number(id));
        console.log(res);
        const value = res.data.value;
        this.studyGroup.id = value.id;
        this.studyGroup.title = value.title;
        this.studyGroup.contents = value.contents;
        this.studyGroup.leader = {
            id: value.leader.id,
            nickname: value.leader.nickname
        };
        console.log(this.studyGroup.leader.id);
        console.log(UserStore.loginUser.id);
        this.studyGroup.city = value.city;
        this.studyGroup.town = value.town;
        this.studyGroup.state = value.state;
        this.studyGroup.maxParticipants = value.maxParticipants;
        this.studyGroup.hits = value.hits;
        this.studyGroup.isOnline = value.isOnline;
        this.studyGroup.monthOrWeek = value.monthOrWeek;
        this.studyGroup.timeslot = value.timeslot;
        this.studyGroup.evaluationLimit = value.evaluationLimit;
        this.studyGroup.enrollDate = value.enrollDate;
        this.studyGroup.startDate = value.startDate;
        this.studyGroup.endDate = value.endDate;
        this.studyGroup.joinedMemberCount = value.joinedMemberCount;
        this.studyGroup.lcategory = value.lcategory;
        this.studyGroup.scategory = value.scategory;
        this.studyGroup.studyMemberDTOList = [];
        if(value.studyMemberDTOList!==null) {
            value.studyMemberDTOList.forEach((sm: StudyMember) => {
                this.studyGroup.studyMemberDTOList.push(
                    {
                        user: {
                            id: sm.user.id,
                            nickname: sm.user.nickname
                        },
                        state: sm.state
                    }
                )
            })
        }
        this.studyGroup.studyScheduleDTOList = []
        if(value.studyScheduleDTOList!==null) {
            value.studyScheduleDTOList.forEach((ss: StudySchedule) => {
                const attend: StudyMember[] = []
                ss.attendanceDTOList.forEach((a) => {
                    attend.push(
                        {
                            user: {
                                id: a.user.id,
                                nickname: a.user.nickname
                            },
                            state: a.state
                        }
                    )
                })
                this.studyGroup.studyScheduleDTOList.push(
                    {
                        id: ss.id,
                        homework: ss.homework,
                        attendanceDTOList: attend,
                        location: ss.location,
                        meetDate: ss.meetDate,
                        subject: ss.subject
                    }
                )
            })
        }
    },

    async deleteStudySchedule(scheduleId : number) {
        try {
            const res = await studyAPI.deleteStudySchedule(Number(scheduleId));
            alert(res.data.message);
        } catch (e) {
            alert("삭제 중 오류가 발생했습니다.")
        }
    }
})

export default StudyStore
