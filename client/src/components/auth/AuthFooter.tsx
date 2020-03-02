/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { SocialButton, KakaoIcon } from './AuthStyled'
import dotenv from 'dotenv'

dotenv.config()

function AuthFooter() {
  const btn = css`
    color: #3c1e1e;

    &:hover {
      color: #3c1e1e;
    }
  `

  const clientId = '65c8c65086b415b91d2decea051f2765'
  const redirectURI = 'http://i02a306.p.ssafy.io/signup/oauth'

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`
  return (
    <div>
      <SocialButton bColor="#F7E317" color="#3C1E1E">
        <KakaoIcon />
        <a href={kakaoURL + ''} css={btn}>
          {' '}
          카카오 계정으로 로그인
        </a>
      </SocialButton>
      <br />
      <br />
    </div>
  )
}

export default AuthFooter
