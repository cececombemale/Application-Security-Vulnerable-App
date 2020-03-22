import React, { Component } from 'react';
import {Link, Redirect } from "react-router-dom";
import { login } from './actions'


export default class Login extends Component {
    
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            valid: false,
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
 
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
   
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (!res.error) {
                this.setState({ valid: true });
            }
        })
    }
    render() {

        // Redirect if logged in 
        if (this.state.valid) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/profile" }} />;
        }

        return (
            <div id = "landing">
              <div id = "loginBox">
                  <form noValidate onSubmit={this.onSubmit}>
                    <h1 id="loginTitle">Please Sign In</h1>
                    <div id="loginBody">
                      <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div id="loginBody">
                      <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <div id = "loginBody">
                    <button
                      type="submit"
                    >
                      Sign in
                    </button>
                    </div>
                  </form>
                  <Link to="register"><div id="register">Create Account</div></Link>
              </div>
            </div>
          )
        }
}