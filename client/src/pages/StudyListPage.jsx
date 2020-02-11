import React, { useEffect } from 'react'
import StudyList from '../components/studyList/StudyList'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'

const StudyListPage = () => {
  const history = useHistory()
  useEffect(() => {
    loadToken(history)
    authCheck(history)
  }, [])
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <StudyList />
    </>
  )
}

export default StudyListPage
