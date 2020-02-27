import { Moment } from 'moment'

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
    noticeDTOList: StudyNotice[],
}

export type StudyMember = {
    user: {
        id: number,
        nickname: string,
        evaluation: number
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

export type StudyNotice = {
    id: number,
    title: string,
    content: string,
    studyId: number,
    writer: {
        id: number,
        nickname: string
    },
    hits: number,
    date: string,
    replyList: NoticeReply[]
}

export type NoticeReply = {
    id: number,
    content: number,
    noticeId: number,
    writer: {
        id: number,
        nickname: string
    },
    date: string
}

export type CreatedNotice = {
    title: string,
    contents: string,
    onChangeTextarea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    [key: string]:
        string
        | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void)
}

export type loginUser = {
    id: number,
    nickname: string
}

export type CreatedOrUpdatedSchedule = {
    id: number,
    study : {
        id: number
    },
    subject: string,
    homework: string,
    meetDate: string,
    location: string,
    onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    [key: string]:
        string
        | object
        | number
        | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void)
}

export type UpdatedAttendance = {
    id: number,
    user: {
        id: number
    },
    state: number
}