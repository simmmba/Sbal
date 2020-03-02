/** @jsx jsx */
import { Route, Switch } from 'react-router-dom'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { PrivateRoute, PublicRoute } from './utils/RouteCheck'

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
import NotFound from './pages/NotFound'
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
        <PrivateRoute path="/UserInfoPage/:id" component={UserInfoPage} exact />
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
        {/* 지도 페이지 */}
        <PrivateRoute path="/map" component={MapPage} />

        <Route component={NotFound} />
      </Switch>

      <Footer />

      <PaddingBottom />
      <NavBarBottom />
    </div>
  )
}

export default App
