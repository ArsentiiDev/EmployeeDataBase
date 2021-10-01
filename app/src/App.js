 import './App.css';
import * as React from 'react';
import Home from './Pages/home/Home';
import Profile from './Pages/Profile/Profile';
import Login from './Components/login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




export default function App() {
  return (
    <>
     {/* <Home/> */}
     {/* <Profile/> */}
     {/* <Login/> */}
     <Router>
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
    </Router>
    </>
  );
}

