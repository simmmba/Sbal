/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import StudyList from '../components/studyList/StudyList'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'
import SearchForm from '../components/studyList/SearchForm'
import StudyStore from '../stores/StudyStore'

const StudyListPage = () => {
  const history = useHistory();

  useEffect(() => {
    loadToken()
    authCheck(history)
    StudyStore.getStudyList()
  }, [history])
  return useObserver(() => (
    <div>
      <SearchForm
        css={css`
          width: 100px;
        `}
      />
      <div
        css={css`
          width: 100%;
        `}
      >
        <StudyList studyList={StudyStore.studyList} />
      </div>
    </div>
  ))
}

export default StudyListPage
