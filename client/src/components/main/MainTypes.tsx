import { Leader } from '../auth/AuthTypes'

export type Study = {
  id?: number
  title: string
  contents?: string
  leader?: Leader
  city: string
  town: string
  state?: number
  maxParticipants: number
  hits?: number
  isOnline: boolean
  monthOrWeek: number
  frequency: number
  weekdayOrWeekend: number
  timeslot: number
  evaluationLimit: number
  enrollDate?: string
  startDate: string
  endDate: string
  joinedMemberCount?: number
  studyMemberDTOList?: null
  studyScheduleDTOList?: null
  scategory: string
  lcategory: string
}

export type StudyRankprops = {
  title: string
  list: Study[]
}
