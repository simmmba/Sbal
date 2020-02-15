import {observable} from 'mobx'
import * as userDetail from '../lib/api/userDetail'
import {UserDetailStoreType, UserInfoType} from '../components/userDetail/UserDetailTypes'


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