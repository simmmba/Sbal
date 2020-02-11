import { observable } from 'mobx'
import * as studyAPI from '../lib/api/study.'

const StudyStore = observable({
  recentStudy: [],
  myStudy: [],
  famousStudy: [],

  studyList: [],
  studyDetail: {},

  async fetchMainStudyList() {
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
  },

  fetchStudyList() {},
  fetchStudyDetail() {}
})

export default StudyStore
