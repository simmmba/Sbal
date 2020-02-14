import apiClient from './client'
import setAuthToken from '../../utils/setAuthToken'
import {studyDetailType } from '../../components/studyDetail/StudyDetailTypes'


export const getMainStudyList = () => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/')
}

export const getStudyList = () => {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get('/')
}

export const studyDetail = (studyId : number) => {
  if(sessionStorage.token){
    setAuthToken(sessionStorage.token)
  }
  return apiClient.get(`/study/${studyId}`)
}

export const studyUpdate =(study : studyDetailType) =>{
  if(sessionStorage.token){
    setAuthToken(sessionStorage.token)
  }
  return apiClient.put('/study', study)
}

export const deleteStudy =(studyId : number) => {
  if(sessionStorage.token){
    setAuthToken(sessionStorage.token)
  }
  return apiClient.delete(`/study/${studyId}`)
}

export const studyDelete = (studyId : number) => {
  if(sessionStorage.token){
    setAuthToken(sessionStorage.token)
  }
  return apiClient.delete(`/study/member/${studyId}`)
}

export const insertMember =(studyId : number) =>{
  if(sessionStorage.token){
    setAuthToken(sessionStorage.token)
  }
  const data = studyId
  
  return apiClient.post('/study/member' , data)
}

export const studyMemberUpdate = (studyId : number, userId : number, stateNum :number)=>{
  if(sessionStorage.token){
    setAuthToken(sessionStorage.token)
  }
  const data = {
    study : {
      id : studyId
    },
    userid :{ id :userId },
    state : stateNum
  }
  return apiClient.put('/study/member', data)
}
// export const getStudyDetails = (studyId: number) => {
//   if (sessionStorage.token) {
//     setAuthToken(sessionStorage.token)
//   }
//   return apiClient.get('/study/' + studyId)
// }
