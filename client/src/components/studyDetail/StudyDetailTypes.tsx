import * as H from 'history'
export type studyDetailType = {
    id : number
    title : string
    hits : number
    leader : user
    contents : string
    city : string
    town : string
    startDate : string
    endDate : string
    lcategory : string
    scategory : string
    joinedMemberCount : number
    maxParticipants : number
    isOnline : boolean 
    monthOrWeek : number
    weekdayOrWeekend : number
    timeslot : number
    evaluationLimit : number
    state : number
    studyMemberDTOList : studyMember[]
}

export type StudyDetailStoreType = {
    studyId : number
    studyMember : number
    studyRequest : number
    data: studyDetailType
    studyDetail: () => void
    deleteStudy: (studyId : number, history: H.History ) => void
    studyTodo: () => void
    insertMember: (studyId : number) => void
    deleteStudyMember: (studyId : number) => void
    isJoin: () => boolean
    isMember: () => boolean
    accept: (studyId : number, userId : number) => void
    down: (studyId : number, userId : number) => void
}

export type studyMember = {
    user : user
    state : number
}

export type user = {
    id : number
    nickname : string
    evaluation : number
}