import React, { useEffect } from 'react'
import StudyDetails from '../components/studyDetail/StudyDetails'
import { useHistory } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'

const StudyDetailPage = () => {
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
