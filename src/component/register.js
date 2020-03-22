import React, { Component } from 'react';
import { register } from './actions'
import {Redirect } from "react-router-dom";


export default class Register extends Component {
  
   constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      isSignedUp: false,
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
        this.setState({ isSignedUp: true }); // after signing up, set the state to true. This will trigger a re-render
          
    })
  }
    render() {
        if (this.state.isSignedUp) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/login" }} />;
          }
        return (
            <div id="landing">
              <div id="loginBox">
                
                  <form noValidate onSubmit={this.onSubmit}>
                  <h1 id="loginTitle">Register</h1>
                    <div id="loginBody">
                        <input required type="text" name="name" placeholder="Enter your name" value={this.state.first_name} onChange={this.onChange}/>
                    </div>
                    <div id="loginBody">
                      <input required type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div id="loginBody">
                      <input required type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <div id = "loginBody">
                    <button type="submit">
                      Create Account
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            
          )
        }
}

