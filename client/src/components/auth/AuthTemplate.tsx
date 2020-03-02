/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StyledContainer, WhiteBox } from './AuthStyled'
import { AuthTemplateProps } from './AuthTypes'

/**
 * 회원가입, 로그인 페이지의 레이아웃
 */

function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <StyledContainer>
      <WhiteBox>{children}</WhiteBox>
    </StyledContainer>
  )
}

export default AuthTemplate
