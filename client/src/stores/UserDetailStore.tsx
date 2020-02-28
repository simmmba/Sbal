import { observable } from 'mobx'
import * as userDetail from '../lib/api/userDetail'
import { UserDetailStoreType } from '../components/userDetail/UserDetailTypes'
import * as studyAPI from '../lib/api/study'
import * as H from 'history'
import { message } from 'antd'
import UserStore from './UserStore'

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
    joinedStudyList: [],
    social_login: ''
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

  async findPassword(email : string, history : H.History){
      try{
        const res = await userDetail.findPassword(email)
        if(res.data.state === 'SUCCESS'){
          message.info("임시 비밀번호가 전송되었습니다.")
          history.push("/login")
        }
        else{
          message.error("등록되지 않은 이메일입니다.")
          return
        }
      } catch(error){
        message.error("등록되지 않은 이메일입니다.")
        return
      } 
  },
  async updatePassword(password : string , newPassword : string, history : H.History){
    try{
      const res = await userDetail.updatePassword(password, newPassword)
      if(res.data.state === 'SUCCESS'){
        message.info("비밀번호가 변경되었습니다. 다시 로그인 해 주세요.")
        UserStore.logout(history)
      }
      else{
        message.error("현재 비밀번호가 일치하지 않습니다.")
      }
    } catch(error){
      message.error("일시적인 오류로 인해 비밀번호 변경이 불가능합니다.")
      return
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
