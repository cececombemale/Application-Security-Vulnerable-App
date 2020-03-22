import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from "./component/home"
import Add from "./component/add"
import Landing from "./component/landing"
import Login from "./component/login"
import Register from "./component/register"
import Profile from "./component/profile"


function App() {

    return (
        <div className="App">
            <Router>
                <div id="navbar">
                    <div>
                        <Link to="/">
                            
                        </Link>
                    </div>
                    <Link to="/">
                        <h1 id="mainTitle">
                            Grocery Shopper
                        </h1>
                    </Link>
                
                    <div className="navitem" id="navProfile">
                        <Link to="profile">
                            My Profile
                        </Link>
                    </div>
                    <div className="navitem" id="navLogin">
                        <Link to="login">
                            Login/Register
                        </Link>
                    </div>
                    <div className="navitem" id="navLogout">
                        <Link to="/" onClick={() => {
                            localStorage.removeItem("usertoken")
                            }}>
                            
                            Logout
                        </Link>
                    </div>


                </div>
                <div id="content">
                    {/* Change to private Route after setting */}
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route exact path="/add">
                        <Add />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>

                </div>
            </Router>
        </div>
    );
}

export default App;