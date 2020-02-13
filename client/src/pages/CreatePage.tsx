import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'
import FilterForm from '../components/studyList/FilterForm'

const StyledContainer = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CreatePage = () => {
  const history = useHistory()
  useEffect(() => {
    loadToken()
    authCheck(history)
  }, [history])

  return (
    <>
      <StyledContainer>
        <FilterForm />
      </StyledContainer>
    </>
  )
}

export default CreatePage
