/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route} from 'react-router-dom';
import HomePage from './components/homepage/index';
import LoginSignup from './components/login/login-signup';
import NavBar from './components/navbar';
const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginSignup}/>
            </Switch>
        </div>
    )
}

export default App
