/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useEffect } from 'react'
import { useLocalStore } from 'mobx-react'
import StudyList from '../components/studyList/StudyList'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'
import SearchForm from '../components/studyList/SearchForm'
import StudyStore from '../stores/StudyStore'
import StudyGroupMain from '../components/studyGroup/StudyGroupMain'

const StudyListPage = () => {
  const history = useHistory()
  const state = useLocalStore(() => ({
    list: []
  }))
  StudyStore.getStudyList()
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

      <StudyList studyList={StudyStore.studyList} />
    </div>
  )
}

export default StudyListPage
