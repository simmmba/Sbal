import { observable } from 'mobx'
import * as studyAPI from '../lib/api/study'
import { getMyInfoDetailsForModify } from '../lib/api/auth'
import { Study } from '../components/main/MainTypes'
import * as H from 'history'
import { message } from 'antd'
import { FilterData } from '../components/studyList/ListTypes'
import {
  loginUser,
  StudyGroupType
} from '../components/studyGroup/StudyGroupType'

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
  loginUser: {} as loginUser,

  userScores: [] as any,

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
      message.error('데이터를 로드하는 중 요류가 발생했습니다.')
    }
  },

  async createStudy(studyData: Study, history: H.History) {
    try {
      await studyAPI.createStudy(studyData)
      history.push('/study')
    } catch (error) {
      message.error(
        '스터디 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        2
      )
    }
  },

  async updateStudy(studyData: Study, history: H.History) {
    try {
      await studyAPI.updateStudy(studyData)
      history.push('/study')
    } catch (error) {
      message.error(
        '스터디 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        2
      )
    }
  },

  async fetchStudyGroup(id: number) {
    try {
      const res = await studyAPI.getStudyGroup(Number(id))
      const userRes = await getMyInfoDetailsForModify()
      this.loginUser.id = userRes.data.value.id
      this.loginUser.nickname = userRes.data.value.nickname

      this.studyGroup = res.data.value
    } catch (e) {
      message.error('조회 중 오류가 발생했습니다.')
    }
  },

  async deleteStudySchedule(scheduleId: number, index: number) {
    try {
      const res = await studyAPI.deleteStudySchedule(Number(scheduleId))
      if (res.data.state === 'SUCCESS') {
        this.studyGroup.studyScheduleDTOList.splice(Number(index), 1)
      }
      message.info(res.data.message)
    } catch (e) {
      message.error('삭제 중 오류가 발생했습니다.')
    }
  },

  async enrollNewNotice(newNotice: object) {
    try {
      const res = await studyAPI.insertNotice(newNotice)
      if (res.data.state === 'SUCCESS') {
        const studyGroup = await studyAPI.getStudyGroup(this.studyGroup.id)
        this.studyGroup = studyGroup.data.value
      } else {
        message.error('공지사항 등록 중 오류가 발생했습니다.')
      }
      message.info(res.data.message)
    } catch (e) {
      message.error('공지사항 등록 중 오류가 발생했습니다.')
    }
  },

  async editNotice(editedNotice: object) {
    try {
      const res = await studyAPI.updateNotice(editedNotice)
      message.info(res.data.message)
    } catch (e) {
      message.error('공지사항 수정 중 오류가 발생했습니다.')
    }
  },

  async deleteNotice(id: number) {
    try {
      const res = await studyAPI.deleteNotice(Number(id))
      message.info(res.data.message)
    } catch (e) {
      message.error('공지사항 삭제 중 오류가 발생했습니다.')
    }
  },

  async enrollNewReply(newReply: object, index: number) {
    try {
      const res = await studyAPI.insertReply(newReply)
      if (res.data.state === 'SUCCESS') {
        const studyGroup = await studyAPI.getStudyGroup(this.studyGroup.id)
        this.studyGroup = studyGroup.data.value
      } else {
        message.error('댓글 등록에 실패했습니다.')
      }
    } catch (e) {
      message.error('댓글 등록 중 오류가 발생했습니다.')
    }
  },

  async deleteReply(replyId: number) {
    try {
      const res = await studyAPI.deleteReply(Number(replyId))
      if (res.data.state === 'SUCCESS') {
        const studyGroup = await studyAPI.getStudyGroup(this.studyGroup.id)
        this.studyGroup = studyGroup.data.value
        message.info('댓글을 삭제 했습니다.')
      } else {
        message.error('댓글 삭제에 실패했습니다.')
      }
    } catch (e) {
      message.error('댓글 삭제 중 오류가 발생했습니다.')
    }
  },

  async getStudyList() {
    try {
      const res = await studyAPI.getStudyList()
      this.studyList = res.data.value
      this.filterData.searchBy = 'title'
      this.filterData.searchText = null
      this.filterData.lcategory = null
      this.filterData.scategory = null
      this.filterData.city = null
      this.filterData.town = null
      this.filterData.weekdayOrWeekend = null
      this.filterData.isOnline = null
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
  },

  async increaseNoticeHits(noticeId: number, nIndex: number) {
    try {
      const res = await studyAPI.increaseNoticeHits(Number(noticeId))
      if (res.data.state === 'SUCCESS') {
        this.studyGroup.noticeDTOList[Number(nIndex)].hits++
      } else {
        message.error('조회 중 오류가 발생했습니다. 새로고침 후 이용해주세요.')
      }
    } catch (e) {
      message.error('조회 중 오류가 발생했습니다. 새로고침 후 이용해주세요.')
    }
  },

  async enrollNewSchedule(newSchedule: object) {
    try {
      const res = await studyAPI.enrollNewSchedule(newSchedule)
      if (res.data.state === 'SUCCESS') {
        this.fetchStudyGroup(this.studyGroup.id)
      }
      message.info(res.data.message)
    } catch (e) {
      message.error('스케줄 등록 중 오류가 발생했습니다. 잠시 후 이용해주세요.')
    }
  },

  async editSchedule(editedSchedule: object) {
    try {
      const res = await studyAPI.editSchedule(editedSchedule)
      if (res.data.state === 'SUCCESS') {
        this.fetchStudyGroup(this.studyGroup.id)
      }
      message.info(res.data.message)
    } catch (e) {
      message.error('스케줄 수정 중 오류가 발생했습니다. 잠시 후 이용해주세요.')
    }
  },

  async updateAttendance(updatedAttendance: object) {
    try {
      const res = await studyAPI.updateAttendance(updatedAttendance)
      if (res.data.state === 'SUCCESS') {
        this.fetchStudyGroup(this.studyGroup.id)
      }
    } catch (e) {
      message.error('출석 변경 중 오류가 발생했습니다. 잠시 후 이용해주세요.')
    }
  }
})

export default StudyStore
