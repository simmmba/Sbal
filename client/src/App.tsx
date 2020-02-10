import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudyListPage from './pages/StudyListPage'

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
        <Route path="/list" component={StudyListPage}></Route>
        <Route path="/signup/oauth" component={SignupPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
      </Switch>
    </div>
  )
}

export default App
