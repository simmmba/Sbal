/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useEffect } from 'react'
import StudyList from '../components/studyList/StudyList'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'
import SearchForm from '../components/studyList/SearchForm'

const StudyListPage = () => {
  const history = useHistory()
  useEffect(() => {
    loadToken()
    authCheck(history)
  }, [history])
  return (
    <div>
      <SearchForm
        css={css`
          width: 100px;
        `}
      />
      <br />
      <br />
      <br />
      <br />
      <br />

      <StudyList />
    </div>
  )
}

export default StudyListPage
