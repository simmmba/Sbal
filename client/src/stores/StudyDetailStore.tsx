import { observable } from 'mobx'
import * as studyAPI from '../lib/api/study'
import { StudyDetailStoreType } from '../components/studyDetail/StudyDetailTypes'
import { timingSafeEqual } from 'crypto'
import { FaTintSlash } from 'react-icons/fa'
import * as H from 'history'

const studyDetailStore: StudyDetailStoreType = observable({
  studyId: -1,
  studyMember: 0,
  studyRequest: 0,
  data: {
    id: 0,
    title: '',
    hits: 0,
    leader: {
      id: 0,
      nickname: '',
      evaluation: 0
    },
    contents: '',
    city: '',
    town: '',
    startDate: '',
    endDate: '',
    lcategory: '',
    scategory: '',
    joinedMemberCount: 0,
    maxParticipants: 0,
    isOnline: true,
    monthOrWeek: 0,
    weekdayOrWeekend: 0,
    timeslot: 0,
    evaluationLimit: 0,
    state: 0,
    studyMemberDTOList: []
  },

  isJoin() {
    const id = sessionStorage.getItem('id')
    if (this.data.studyMemberDTOList !== null) {
      for (let i = 0; i < this.data.studyMemberDTOList.length; i++) {
        if (this.data.studyMemberDTOList[i]['user']['id'] + '' === id) {
          return true
        }
      }
    }
    return false
  },

  isMember() {
    const id = sessionStorage.getItem('id')
    if (this.data.studyMemberDTOList !== null) {
      for (let i = 0; i < this.data.studyMemberDTOList.length; i++) {
        if (this.data.studyMemberDTOList[i]['user']['id'] + '' === id) {
          if (this.data.studyMemberDTOList[i]['state'] === 1) {
            return true
          }
        }
      }
    }
    return false
  },

  async updateStudyMember(studyId: number , userId: number, state : number) {
    try {
      const res = await studyAPI.studyMemberUpdate(studyId,  userId, state)
      this.studyDetail()
    } catch (error) {}
  },

  // async down(studyId: number, userId: number) {
  //   try {
  //     const res = await studyAPI.studyMemberUpdate(studyId, userId, 2)
  //     this.studyDetail()
  //   } catch (error) {}
  // },

  async studyTodo() {
    try {
      this.data.state = 1
      const res = await studyAPI.studyUpdate(this.data)
      this.studyDetail()
    } catch (error) {
      alert('스터디 진행에 실패하였습니다.')
    }
  },

  async insertMember(studyId: number) {
    try {
      const res = await studyAPI.insertMember(studyId)
      alert('신청 되었습니다.')
      this.studyDetail()
    } catch (error) {
      alert('요청에 실패하였습니다.')
    }
  },

  async deleteStudy(studyId: number, history: H.History) {
    try {
      const res = await studyAPI.deleteStudy(studyId)
      alert('스터디가 삭제 되었습니다.')
      history.push('/')
    } catch {
      alert('스터디 삭제에 실패하였습니다.')
    }
  },

  async deleteStudyMember(studyId: number, state:number) {
    try {
      const res = await studyAPI.studyDelete(studyId)
      if(state === 1) alert('신청이 취소 되었습니다.')
      else if(state === 2 ) alert('탈퇴 되었습니다.')
      this.studyDetail()
    } catch (error) {
      alert('요청에 실패하였습니다.')
    }
  },

  async studyDetail() {
    try {
      this.studyMember = 0
      this.studyRequest = 0
      const res = await studyAPI.studyDetail(this.studyId)
      //const token = res.headers['jwt-auth-token']
      //sessionStorage.setItem('token', token)
      this.data = res.data.value
      if (this.data.studyMemberDTOList !== null) {
        for (var i = 0; i < this.data.studyMemberDTOList.length; i++) {
          //alert(this.data.studyMemberDTOList[i]['state'] )
          if (this.data.studyMemberDTOList[i]['state'] === 1) {
            this.studyMember++
          } else if (this.data.studyMemberDTOList[i]['state'] === 0) {
            this.studyRequest++
          }
        }
      }
    } catch (error) {
      alert('정보를 가져오지 못했습니다.')
    }
  }
})
export default studyDetailStore
