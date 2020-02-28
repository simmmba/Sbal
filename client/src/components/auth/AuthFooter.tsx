import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import palette from '../../lib/styles/palette'
import { SocialButton, KakaoIcon } from './AuthStyled'
import dotenv from 'dotenv'


dotenv.config()

function AuthFooter() {

  
  const clientId = '65c8c65086b415b91d2decea051f2765'
  //const redirectURI = 'http://localhost:3000/signup/oauth'
  const redirectURI = 'http://i02a306.p.ssafy.io/signup/oauth'
 
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`
  // const naverURL =
  //   'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=ZaZ22Ro1uzKMK_w_pbkX&redirect_uri=http%3A%2F%2F70.12.247.32%3A8080%2Fuser%2Fauth%2Fnaver%2Fcallback&scope=profile'
  return (
    <div>
      <h4
        css={css`
          color: ${palette.violet[7]};
        `}
      >
        SNS 로그인
      </h4>
      <SocialButton
        bColor="#F7E317"
        color="#3C1E1E"
        //  onRemove={() => {
        //    openWindow(kakaoURL)
        //  }}
      >
        <KakaoIcon />
       <a href={kakaoURL+""}> 카카오 계정으로 로그인</a>
      </SocialButton>
      <br />
      <br />
    </div>
  )
}

export default AuthFooter
