import React from 'react'
/**@jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'

export const Display = styled.div`
  width: 65%;
  /* display: inline-block; */
  margin: 0 auto;

  @media screen and (max-width: 500px) {
    /* .site-container {
      flex-direction: row;
    } */
    width: 95%;
  }
`

// export const AuthFormBlock = styled.div`
//   h3 {
//     margin: 0;
//     color: black;
//     margin-bottom: 2rem;
//   }
// `
