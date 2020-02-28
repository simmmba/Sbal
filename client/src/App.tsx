/**@jsx jsx */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudyListPage from './pages/StudyListPage'
import StudyGroupPage from './pages/StudyGroupPage'
import StudyDetailPage from './pages/StudyDetailPage'
import CreatePage from './pages/CreatePage'
import MyInfoPage from './pages/MyInfoPage'
import UserInfoPage from './pages/UserInfoPage'
import Footer from './components/Footer'
import MapPage from './pages/Map'
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import NavBarBottom from './components/NavBarBottom'

const PaddingBottom = styled.div`
  @media screen and (max-width: 815px) {
    height: 67px;
  }
`

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />

      <ScrollToTop />

      <Switch>
        {/* 랜딩페이지 & 홈페이지 */}
        <Route path="/" component={HomePage} exact />
        {/* 회원가입 & 소셜로그인 페이지 */}
        <Route path="/signup" component={LoginPage} exact />
        {/* 회원가입 양식 페이지 */}
        <Route path="/signup/form" component={SignupPage} />
        {/* 최초 소셜로그인 후 추가정보 입력 페이지  */}
        <Route path="/signup/oauth" component={SignupPage} />
        {/* 로그인 & 소셜로그인 페이지 */}
        <Route path="/login" component={LoginPage} exact />
        <Route path="/login/temp-password" component={LoginPage} />
        {/* 마이페이지 */}
        <Route path="/mypage" component={MyInfoPage} exact />
        <Route path="/mypage/update" component={SignupPage} exact />
        <Route path="/mypage/update/password" component={MyInfoPage} />

        <Route path="/UserInfoPage/:id" component={UserInfoPage} exact />
        {/* 스터디 리스트 페이지 */}
        <Route path="/study" component={StudyListPage} exact />
        {/* 스터디 개설 페이지 */}
        <Route path="/study/create" component={CreatePage} exact />
        {/* 스터디 상세정보 페이지 */}
        <Route path="/study/details/:id" component={StudyDetailPage} exact />
        {/* 스터디 그룹 페이지 */}
        <Route path="/study/:id" component={StudyGroupPage} />
        <Route path="/map" component={MapPage} />
      </Switch>

      <Footer />

      <PaddingBottom />
      <NavBarBottom />
    </div>
  )
}

export default App
