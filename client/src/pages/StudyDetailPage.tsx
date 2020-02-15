import React, { useEffect } from 'react'
import StudyDetails from '../components/studyDetail/StudyDetails'
import StudyDetailStore from '../stores/StudyDetailStore'
import { useParams } from 'react-router'
import { useHistory } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'

const StudyDetailPage = () => {
  const { id } = useParams()
  StudyDetailStore.studyId = Number(id)
  const history = useHistory()
  useEffect(() => {
    loadToken()
    authCheck(history)
  }, [history])
  return (
    <>
      <StudyDetails />
    </>
  )
}

export default StudyDetailPage
