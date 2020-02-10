import React from 'react'
import { SocialButton, FbIcon, KakaoIcon, NaverIcon } from './AuthStyled'
import dotenv from 'dotenv'
dotenv.config()

function Footer() {
  const openWindow = (url: string) => {
    window.open(url, 'newwindow', 'width=490,height=560')
  }
  // const clientid = '65c8c65086b415b91d2decea051f2765'
  // const redirectURI = 'http://70.12.247.32:8080/user/auth/kakao/callback'
  const clientId = process.env.REACT_APP_KAKAO_REST_KEY
  const redirectURI = 'http://70.12.247.80:3000/signup/oauth'
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`
  const naverURL =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=ZaZ22Ro1uzKMK_w_pbkX&redirect_uri=http%3A%2F%2F70.12.247.32%3A8080%2Fuser%2Fauth%2Fnaver%2Fcallback&scope=profile'
  return (
    <div>
      <h4>SNS 로그인</h4>
      <SocialButton color="white" bColor="#1673EA">
        <FbIcon />
        페이스북 계정으로 로그인
      </SocialButton>

      <SocialButton
        bColor="#F7E317"
        color="#3C1E1E"
        onRemove={() => {
          openWindow(kakaoURL)
        }}
      >
        <KakaoIcon />
        카카오 계정으로 로그인
      </SocialButton>

      <SocialButton
        bColor="#1EC800"
        color="white"
        onRemove={() => {
          openWindow(naverURL)
        }}
      >
        <NaverIcon />
        네이버 계정으로 로그인
      </SocialButton>
    </div>
  )
}

export default Footer
