import { observable } from 'mobx'
import * as userDetail from '../lib/api/userDetail'
import { UserDetailStoreType } from '../components/userDetail/UserDetailTypes'
import * as studyAPI from '../lib/api/study'
import * as H from 'history'
import { message } from 'antd'

const UserDetailStore: UserDetailStoreType = observable({
  // isLoggingIn : false,
  joinCount: 0,
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
      if(window.confirm("목록에서 삭제 하시겠습니까?")){
        const res = await studyAPI.studyDelete(studyId)
        this.data.joinedStudyList.splice(idx, 1)
      } else return;
      
    } catch (error) {}
  },
  async mypage() {
    try {
      this.joinCount = 0
      const res = await userDetail.myInfo()
      this.data = res.data.value
      if (this.data.joinedStudyList !== null) {
        for (let i = 0; i < this.data.joinedStudyList.length; i++) {
          if (this.data.joinedStudyList[i]['state'] == 1) {
            this.joinCount++
          }
        }
      }
    } catch (error) {
      message.error('사용자 정보를 가져오지 못했습니다.')
    }
  },

  async upload(formdata: FormData) {
    try {
      console.log(formdata.get('file'))
      const res = await userDetail.upload(formdata)
      console.log(res)
      this.mypage()
    } catch (error) {}
  },

  goUserInfo(userId: number, history: H.History) {
    history.push(`/UserInfopage/${userId}`)
  },

  async userInfo(userId: number) {
    try {
      this.joinCount = 0
      const res = await userDetail.userInfo(userId)
      this.data = res.data.value
      if (this.data.joinedStudyList !== null) {
        for (let i = 0; i < this.data.joinedStudyList.length; i++) {
          if (this.data.joinedStudyList[i]['state'] == 1) {
            this.joinCount++
          }
        }
      }
    } catch (error) {}
  }
})

export default UserDetailStore
