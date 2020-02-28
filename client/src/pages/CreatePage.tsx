import React from 'react'
import styled from '@emotion/styled'
import CreateForm from '../components/studyList/CreateForm'

const StyledContainer = styled.div`
  background: #f3f0ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CreatePage = () => {
  return (
    <>
      <StyledContainer>
        <CreateForm />
      </StyledContainer>
    </>
  )
}

export default CreatePage
