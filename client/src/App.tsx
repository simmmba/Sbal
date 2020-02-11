import React from 'react'
import {Route, Switch} from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudyListPage from './pages/StudyListPage'
import Footer from './components/Footer'
import './App.css'

const App: React.FC = () => {
    return (
        <div className="App">
            <NavBar/>
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/signup" component={LoginPage} exact={true}/>
                <Route path="/signup/form" component={SignupPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/list" component={StudyListPage}/>
                <Route path="/signup/oauth" component={SignupPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/myInfo/update" component={SignupPage}/>
            </Switch>
            <Footer/>
        </div>
    )
}

export default App
