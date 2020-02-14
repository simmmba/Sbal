
export type StudyGroupType = {
    id: number,
    title: string,
    contents: string,
    leader: {
        id: number,
        nickname: string
    },
    city: string,
    town: string,
    state: number,
    maxParticipants: number,
    hits: number,
    isOnline: boolean,
    monthOrWeek: number,
    timeslot: number,
    evaluationLimit: number,
    enrollDate: string,
    startDate: string,
    endDate: string,
    joinedMemberCount: number,
    lcategory: string,
    scategory: string,

    studyMemberDTOList: StudyMember[],
    studyScheduleDTOList: StudySchedule[]
    // noticeDTOList: null
}

export type StudyMember = {
    user: {
        id: number,
        nickname: string
    },
    state: number
}

export type StudySchedule = {
    id: number,
    attendanceDTOList: StudyMember[],
    subject: string,
    homework: string,
    meetDate: string,
    location: string
}
