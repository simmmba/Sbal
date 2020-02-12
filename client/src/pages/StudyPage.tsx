import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { loadToken, authCheck } from '../utils/authCheck'

const StudyPage = () => {
  const history = useHistory()
  useEffect(() => {
    loadToken()
    authCheck(history)
  }, [history])
  return <></>
}

export default StudyPage
