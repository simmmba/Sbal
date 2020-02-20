import { observable } from 'mobx'
import * as studyAPI from '../lib/api/study'
import { StudyDetailStoreType } from '../components/studyDetail/StudyDetailTypes'
import * as H from 'history'
import { message } from 'antd'

const studyDetailStore: StudyDetailStoreType = observable({
  studyId: -1,
  studyMember: 0,
  studyRequest: 0,
  modalVisible: false,
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
    frequency: 0,
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


  goStudyGroup(studyId: number, history: H.History) {

    history.push(`/study/${studyId}`)
  },

  async updateStudyMember(studyId: number, userId: number, state: number) {
    try {
      if(state===1){
        if(window.confirm("수락 하시겠습니까?")){
          await studyAPI.studyMemberUpdate(studyId, userId, state)
          message.info("수락 되었습니다.")
        } else return;
      } else if(state ===2){
        if(window.confirm("거절 하시겠습니까?")){
          await studyAPI.studyMemberUpdate(studyId, userId, state)
          message.info("거절 되었습니다.")
        } else return;
      }
      else if(state===3){
        if(window.confirm("정말 내보내시겠습니까?")){
          await studyAPI.studyMemberUpdate(studyId, userId, state)
          message.info("완료 되었습니다.")
        } else return;
      }
      this.studyDetail()
    } catch (error) {
      alert('수정 중 오류가 발생하였습니다.')
    }
  },


  async studyTodo(state : number) {
    try {
      if(state==1){
        if(window.confirm("스터디를 진행 하시겠습니까?")){
          this.data.state = state
          await studyAPI.studyUpdate(this.data)
          message.info('스터디가 시작 되었습니다.')
        } else return
        
      }else if(state == 2) {
        if(window.confirm("스터디를 종료 하시겠습니까?")){
          this.data.state = state
          await studyAPI.studyUpdate(this.data)
          message.info('스터디가 종료 되었습니다.')
        } else return
      }   
      this.studyDetail()
    } catch (error) {
      message.error('실패하였습니다.')
    }
  },

  async insertMember(studyId: number) {
    try {
      if(window.confirm("스터디를 신청 하시겠습니까?")){
        await studyAPI.insertMember(studyId)
        message.info('신청 되었습니다.')
      } else return  
      this.studyDetail()
    } catch (error) {
      message.error('요청에 실패하였습니다.')
    }
  },

  async deleteStudy(studyId: number, history: H.History) {
    try {
      if(window.confirm("스터디를 삭제 하시겠습니까?")){
        await studyAPI.deleteStudy(studyId)
        message.info('스터디가 삭제 되었습니다.')
        history.push('/')
      } else return;
      
    } catch {
      message.error('스터디 삭제에 실패하였습니다.')
    }
  },

  async deleteStudyMember(studyId: number, state: number) {
    try {
     
      if (state === 1) {
        if(window.confirm("신청을 취소 하시겠습니까?")){
          await studyAPI.studyDelete(studyId)
          message.info('신청이 취소 되었습니다.')
        }else return
        
      } else if (state === 2) {
        if(window.confirm("탈퇴 하시겠습니까?")){
          await studyAPI.studyDelete(studyId)
          message.info('탈퇴 되었습니다.')
        }else return
        
      }
      this.studyDetail()
    } catch (error) {
      message.error('요청에 실패하였습니다.')
    }
  },

  async studyDetail() {
    try {
      this.studyMember = 0
      this.studyRequest = 0
      const res = await studyAPI.studyDetail(this.studyId);
      this.data = res.data.value
      if (this.data.studyMemberDTOList !== null) {
        for (let i = 0; i < this.data.studyMemberDTOList.length; i++) {
          if (this.data.studyMemberDTOList[i]['state'] === 1) {
            this.studyMember++
          } else if (this.data.studyMemberDTOList[i]['state'] === 0) {
            this.studyRequest++
          }
        }
      }
    } catch (error) {
      message.error('정보를 가져오지 못했습니다.')
    }
  }
})
export default studyDetailStore
