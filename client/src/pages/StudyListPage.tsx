import React, { useEffect } from 'react'
import StudyList from '../components/studyList/StudyList'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'
import StudyGroupMain from '../components/studyGroup/StudyGroupMain'

const StudyListPage = () => {
  const history = useHistory()
  useEffect(() => {
    loadToken()
    authCheck(history)
  }, [history])
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
