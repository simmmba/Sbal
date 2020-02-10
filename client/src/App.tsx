import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudyListPage from './pages/StudyListPage'
import StudyPage from './pages/StudyPage'
import StudyDetailPage from './pages/StudyDetailPage'

import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/signup" component={LoginPage} exact></Route>
        <Route path="/signup/form" component={SignupPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        {/* 스터디 리스트 페이지 */}
        <Route path="/study" component={StudyListPage} exact></Route>
        {/* 참여한 스터디 페이지 */}
        <Route path="/study/:id" component={StudyPage} exact></Route>
        {/* 스터디 상세정보 페이지 */}
        <Route path="/study/details/:id" component={StudyDetailPage}></Route>
        <Route path="/signup/oauth" component={SignupPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
      </Switch>
    </div>
  )
}

export default App
