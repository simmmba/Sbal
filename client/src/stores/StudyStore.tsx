import { observable } from 'mobx'
import * as studyAPI from '../lib/api/study'
import { StudyGroupType } from '../components/studyGroup/StudyGroupType'

const StudyStore = observable({
  recentStudy: [],
  myStudy: [],
  famousStudy: [],

  studyList: [],
  studyDetail: {},

  studyGroup: {} as StudyGroupType,

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
      alert('데이터를 로드하는 중 요류가 발생했습니다.')
    }
  },

  fetchStudyList() {},
  fetchStudyDetail() {},

  async fetchStudyGroup(id: number) {
    const res = await studyAPI.getStudyGroup(Number(id));
    this.studyGroup = res.data.value;
    console.log(res.data.value);
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
      const res = await studyAPI.insertNotice(newNotice);
      this.studyGroup.noticeDTOList.push(res.data.value);
      alert(res.data.message);
    } catch (e) {
      alert('공지사항 등록 중 오류가 발생했습니다.')
    }
  },

  async editNotice(editedNotice: object) {
    try {
      const res = await studyAPI.updateNotice(editedNotice);
      alert(res.data.message);
    } catch (e) {
      alert('공지사항 수정 중 오류가 발생했습니다.')
    }
  },

  async deleteNotice(id: number) {
    try {
      const res = await studyAPI.deleteNotice(Number(id));
      alert(res.data.message);
    } catch (e) {
      alert('공지사항 삭제 중 오류가 발생했습니다.')
    }
  }
})

export default StudyStore
