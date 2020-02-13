import { observable } from 'mobx'
import * as studyAPI from '../lib/api/study.'
import { Study } from '../components/main/MainTypes'
import * as H from 'history'
import { message } from 'antd'

const StudyStore = observable({
  recentStudy: [],
  myStudy: [],
  famousStudy: [],

  studyList: [],
  studyDetail: {},

  async fetchMainStudyList() {
    try {
      const res = await studyAPI.getMainStudyList()

      if (res.data.value.loginUser) {
        const {
          loginUser: { joinedStudyList }
        } = res.data.value
        this.myStudy = joinedStudyList
      }

      const { recentlyEnrolled, mostHits } = res.data.value

      this.recentStudy = recentlyEnrolled
      this.famousStudy = mostHits
    } catch (error) {
      alert('데이터를 로드하는 중 요류가 발생했습니다')
    }
  },

  fetchStudyList() {},
  fetchStudyDetail() {},

  async createStudy(studyData: Study, history: H.History) {
    try {
      const res = await studyAPI.createStudy(studyData)
      console.log(res)
      history.push('/study')
    } catch (error) {
      message.error(error)
    }
  },

  async UpdateStudy() {}
})

export default StudyStore
