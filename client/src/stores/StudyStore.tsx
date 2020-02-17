import { observable } from 'mobx'
import * as studyAPI from '../lib/api/study'
import { Study } from '../components/main/MainTypes'
import * as H from 'history'
import { message } from 'antd'
import { FilterData } from '../components/studyList/ListTypes'
import { StudyGroupType } from '../components/studyGroup/StudyGroupType'

const StudyStore = observable({
  recentStudy: [],
  myStudy: [],
  famousStudy: [],

  studyList: [],
  studyDetail: {},

  studyGroup: {} as StudyGroupType,
  filterData: {
    searchBy: 'title',
    searchText: null,
    lcategory: null,
    scategory: null,
    city: null,
    town: null,
    weekdayOrWeekend: null,
    isOnline: null
  } as FilterData,
  modalVisible: false,

  async fetchMainStudyList() {
    try {
      const res = await studyAPI.getMainStudyList()
      if (res.data.value.loginUser) {
        const {
          loginUser: { joinedStudyList }
        } = res.data.value
        this.myStudy = joinedStudyList.map(
          (study: { state: number; study: Study; user: null }) => study.study
        )
      }

      const { recentlyEnrolled, mostHits } = res.data.value

      this.recentStudy = recentlyEnrolled
      this.famousStudy = mostHits
    } catch (error) {
      alert('데이터를 로드하는 중 요류가 발생했습니다.')
    }
  },

  async createStudy(studyData: Study, history: H.History) {
    try {
      const res = await studyAPI.createStudy(studyData)
      console.log(res)
      history.push('/study')
    } catch (error) {
      message.error(error)
    }
  },

  async UpdateStudy() {},
  async fetchStudyGroup(id: number) {
    const res = await studyAPI.getStudyGroup(Number(id));
    this.studyGroup = res.data.value;
  },

  async deleteStudySchedule(scheduleId: number) {
    try {
      const res = await studyAPI.deleteStudySchedule(Number(scheduleId))
      alert(res.data.message)
    } catch (e) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  },

  async enrollNewNotice(newNotice: object) {
    try {
      const res = await studyAPI.insertNotice(newNotice)
      if (res.data.state === 'SUCCESS') {
        const studyGroup = await studyAPI.getStudyGroup(this.studyGroup.id)
        this.studyGroup = studyGroup.data.value
      } else {
        alert('공지사항 등록 중 오류가 발생했습니다.')
      }
      // this.studyGroup.noticeDTOList.push(res.data.value);
      alert(res.data.message)
    } catch (e) {
      alert('공지사항 등록 중 오류가 발생했습니다.')
    }
  },

  async editNotice(editedNotice: object) {
    try {
      const res = await studyAPI.updateNotice(editedNotice)
      alert(res.data.message)
    } catch (e) {
      alert('공지사항 수정 중 오류가 발생했습니다.')
    }
  },

  async deleteNotice(id: number) {
    try {
      const res = await studyAPI.deleteNotice(Number(id))
      alert(res.data.message)
    } catch (e) {
      alert('공지사항 삭제 중 오류가 발생했습니다.')
    }
  },

  async enrollNewReply(newReply: object, index: number) {
    try {
      const res = await studyAPI.insertReply(newReply)
      if (res.data.state === 'SUCCESS') {
        // this.studyGroup.noticeDTOList[Number(index)].replyList.push(res.data.value)
        const studyGroup = await studyAPI.getStudyGroup(this.studyGroup.id)
        this.studyGroup = studyGroup.data.value
      } else {
        alert('댓글 등록에 실패했습니다.')
      }
    } catch (e) {
      alert('댓글 등록 중 오류가 발생했습니다.')
    }
  },

  async deleteReply(replyId: number) {
    try {
      const res = await studyAPI.deleteReply(Number(replyId))
      if (res.data.state === 'SUCCESS') {
        const studyGroup = await studyAPI.getStudyGroup(this.studyGroup.id)
        this.studyGroup = studyGroup.data.value
        alert('댓글을 삭제 했습니다.')
      } else {
        alert('댓글 삭제에 실패했습니다.')
      }
    } catch (e) {
      alert('댓글 삭제 중 오류가 발생했습니다.')
    }
  },
  async getStudyList() {
    try {
      const res = await studyAPI.getStudyList()
      this.studyList = res.data.value
    } catch (error) {
      message.error('데이터 로드에 실패했습니다. 새로고침 후 다시 이용해주세요')
    }
  },
  async filterStudyList() {
    try {
      const res = await studyAPI.getFilteredList(this.filterData)
      this.studyList = res.data.value
    } catch (error) {
      message.error('데이터 로드에 실패했습니다. 새로고침 후 다시 이용해주세요')
    }
  }
})

export default StudyStore
