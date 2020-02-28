import * as H from 'history'
export type UserInfoType = {
    id : number
    email : string
    phoneNum : string
    nickname : string
    gender : number
    introduction : string
    city : string
    town : string
    evaluation : number
    profilePhotoDir : string 
    interestDTOList : Interest[]
    ledStudyList : LedStudy[]
    joinedStudyList : JoinedStudy[]
}
export type UserDetailStoreType = {
    data: UserInfoType
    joinCount : number
    mypage: () => void
    goUserInfo: (userId: number, history : H.History) => void
    userInfo: (userId : number) => void
    deleteStudyMember: (studyId : number, idx : number)=> void
    upload: (formdata: FormData) => void
    findPassword: (email : string, history : H.History) => void
    updatePassword: (password: string , newPassword : string, history : H.History) => void
}
export type Interest = {
    lcategory: string
    scategory: string
}

 export type LedStudy = {
    id : number
    title : string 
    state : number
    maxParticipants : number
    isOnline : boolean
    startDate : string
    endDate : string
    joinedMemberCount : number
    joinRequestCount: number
 }

 export type JoinedStudy ={
     study : study
     state : number
 }

 export type study = {
    id : number
    title : string 
    state : number
    maxParticipants : number
    isOnline : boolean
    startDate: string 
    endDate : string 
    joinedMemberCount : number
 }