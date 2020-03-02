/** @jsx jsx */
import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import { PrivateRoute, PublicRoute } from './utils/RouteCheck'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import NavBarBottom from './components/NavBarBottom'
import LoadingSpin from './components/common/LoadingSpin'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const StudyListPage = lazy(() => import('./pages/StudyListPage'))
const StudyGroupPage = lazy(() => import('./pages/StudyGroupPage'))
const StudyDetailPage = lazy(() => import('./pages/StudyDetailPage'))
const CreatePage = lazy(() => import('./pages/CreatePage'))
const MyInfoPage = lazy(() => import('./pages/MyInfoPage'))
const UserInfoPage = lazy(() => import('./pages/UserInfoPage'))

const MapPage = lazy(() => import('./pages/Map'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
      <Suspense
        fallback={
          <div
            css={css`
              display: flex;
              min-height: 700px;
              font-size: 30px;
              color: #5f3dc4;
              justify-content: center;
              align-items: center;
            `}
          >
            <LoadingSpin />
            <div>페이지 이동중입니다...</div>
          </div>
        }
      >
        <Switch>
          {/* 랜딩페이지 & 홈페이지 */}
          <Route path="/" component={HomePage} exact />
          {/* 회원가입 & 소셜로그인 페이지 */}
          <PublicRoute path="/signup" component={LoginPage} exact />
          {/* 회원가입 양식 페이지 */}
          <PublicRoute path="/signup/form" component={SignupPage} />
          {/* 최초 소셜로그인 후 추가정보 입력 페이지  */}
          <PublicRoute path="/signup/oauth" component={SignupPage} />
          {/* 로그인 & 소셜로그인 페이지 */}
          <PublicRoute path="/login" component={LoginPage} exact />
          <PublicRoute path="/login/temp-password" component={LoginPage} />
          {/* 마이페이지 */}
          <PrivateRoute path="/mypage" component={MyInfoPage} exact />
          <PrivateRoute path="/mypage/update" component={SignupPage} exact />
          <PrivateRoute path="/mypage/update/password" component={MyInfoPage} />

          <PrivateRoute
            path="/UserInfoPage/:id"
            component={UserInfoPage}
            exact
          />
          {/* 스터디 리스트 페이지 */}
          <Route path="/study" component={StudyListPage} exact />
          {/* 스터디 개설 페이지 */}
          <PrivateRoute path="/study/create" component={CreatePage} exact />
          {/* 스터디 상세정보 페이지 */}
          <PrivateRoute
            path="/study/details/:id"
            component={StudyDetailPage}
            exact
          />
          {/* 스터디 그룹 페이지 */}
          <PrivateRoute path="/study/:id" component={StudyGroupPage} />
          <PrivateRoute path="/map" component={MapPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>

      <Footer />

      <PaddingBottom />
      <NavBarBottom />
    </div>
  )
}

export default App
