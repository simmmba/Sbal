import { Leader } from '../auth/AuthTypes'

export type Study = {
  id: number
  title: string
  contents?: string
  leader?: Leader
  city: string
  town: string
  state: 0
  maxParticipants: number
  hits: number
  isOnline: boolean
  monthOrWeek: null
  frequency: null
  weekdayOrWeekend: null
  timeslot: null
  evaluationLimit: null
  enrollDate: string
  startDate: string
  endDate: string
  joinedMemberCount: number
  studyMemberDTOList: null
  studyScheduleDTOList: null
  scategory: string
  lcategory: string
}

export type StudyRankprops = {
  title: string
  list: Study[]
}
