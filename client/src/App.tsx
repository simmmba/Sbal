import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudyListPage from './pages/StudyListPage'
import StudyGroupPage from './pages/StudyGroupPage'
import StudyDetailPage from './pages/StudyDetailPage'
import CreatePage from './pages/CreatePage'
import MyInfoPage from './pages/MyInfoPage'
import Footer from './components/Footer'

import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        {/* 랜딩페이지 & 홈페이지 */}
        <Route path="/" component={HomePage} exact></Route>
        {/* 회원가입 & 소셜로그인 페이지 */}
        <Route path="/signup" component={LoginPage} exact></Route>
        {/* 회원가입 양식 페이지 */}
        <Route path="/signup/form" component={SignupPage}></Route>
        {/* 최초 소셜로그인 후 추가정보 입력 페이지  */}
        <Route path="/signup/oauth" component={SignupPage}></Route>
        {/* 로그인 & 소셜로그인 페이지 */}
        <Route path="/login" component={LoginPage}></Route>
        {/* 마이페이지 */}
        <Route path="/mypage" component={MyInfoPage}></Route>
        {/* 스터디 리스트 페이지 */}
        <Route path="/study" component={StudyListPage} exact></Route>
        {/* 스터디 개설 페이지 */}
        <Route path="/study/create" component={CreatePage} exact></Route>
        {/* 참여한 스터디 페이지
        <Route path="/study/:id" component={StudyPage} exact></Route> */}
        {/* 스터디 그룹 페이지 */}
        <Route path="/study/:id" component={StudyGroupPage} exact></Route>
        {/* 스터디 상세정보 페이지 */}
        <Route path="/study/details/:id" component={StudyDetailPage}></Route>
        {/* ??? */}
        <Route path="/myInfo/update" component={SignupPage} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
