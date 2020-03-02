import React from 'react'
/**@jsx jsx */
import styled from '@emotion/styled'

export const Display = styled.div`
  width: 65%;
  margin: 0 auto;
  min-height: 700px;

  @media screen and (max-width: 500px) {
    width: 95%;
    margin-bottom: 100px;
  }
`
