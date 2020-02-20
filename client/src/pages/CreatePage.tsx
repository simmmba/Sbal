import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { authCheck, loadToken } from '../utils/authCheck'
import CreateForm from '../components/studyList/CreateForm'

const StyledContainer = styled.div`
  background: #f3f0ff;
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
        <CreateForm />
      </StyledContainer>
    </>
  )
}

export default CreatePage
