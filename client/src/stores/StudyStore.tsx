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
    searchText: '',
    lcategory: '어학',
    scategory: 'TOEIC',
    city: '서울',
    town: '강남구',
    weekdayOrWeekend: 2,
    isOnline: 1
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
    const res = await studyAPI.getStudyGroup(Number(id))
    this.studyGroup = res.data.value
    console.log(res.data.value)
    console.log(this.studyGroup.noticeDTOList[0].title)
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
      this.studyGroup.noticeDTOList.push(res.data.value)
      alert(res.data.message)
    } catch (e) {
      alert('공지사항 등록에 실패했습니다.')
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
