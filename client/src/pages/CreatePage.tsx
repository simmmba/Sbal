import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'
import FilterForm from '../components/studyList/FilterForm'

const CreatePage = () => {
  const history = useHistory()
  useEffect(() => {
    loadToken()
    authCheck(history)
  }, [history])

  return (
    <>
      <FilterForm />
    </>
  )
}

export default CreatePage
