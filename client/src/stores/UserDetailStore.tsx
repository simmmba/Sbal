import { observable } from 'mobx'
import * as userDetail from '../lib/api/userDetail'
import {
  UserDetailStoreType,
  UserInfoType
} from '../components/userDetail/UserDetailTypes'
import * as studyAPI from '../lib/api/study'

const UserDetailStore: UserDetailStoreType = observable({
  // isLoggingIn : false,

  data: {
    id: 0,
    email: '',
    phoneNum: '',
    nickname: '',
    gender: 0,
    introduction: '',
    city: '',
    town: '',
    evaluation: 0,
    profilePhotoDir: '',
    interestDTOList: [],
    ledStudyList: [],
    joinedStudyList: []
  },
  //{id, pw, email, phoneNum, nickname, gender, introduction,
  //city, town, evaluation, profilePhotoDir, socialLogin, interestDTOList, ledStudyList, joinedStudyList}
  async deleteStudyMember(studyId: number, idx: number) {
    try {
      const res = await studyAPI.studyDelete(studyId)
      this.data.joinedStudyList.splice(idx, 1)
    } catch (error) {}
  },
  async mypage() {
    try {
      const res = await userDetail.userInfo()
      console.log(res.data)
      this.data = res.data.value
    } catch (error) {
      alert('사용자 정보를 가져오지 못했습니다.')
    }
  }
})

export default UserDetailStore
