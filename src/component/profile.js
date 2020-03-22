import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import ToDoList from "./list";


export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
          name: '',
          email: '',
          errors: {}
        }
      }
        
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          name: decoded.identity.name,
          email: decoded.identity.email
        })
        document.getElementById("navLogout").style.display = "flex"
        document.getElementById("navLogin").style.display = "none"

      }
    

    render() {
        
            return (
              <div id = "profileLanding">
                <div className="jumbotron mt-5">
                  <div className="col-sm-8 mx-auto">
                    <h1 id = "profileWelcome">Your Shopping Lists</h1>
                  </div>
                  <table id="table">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{this.state.name}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{this.state.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                <ToDoList />
                </div>
              </div>
              
            )
          }
        
}