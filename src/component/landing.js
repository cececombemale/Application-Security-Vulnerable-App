import React, { Component } from 'react';
import '../App.css';
import {Redirect } from "react-router-dom";

import Fridge from "../media/fridge.svg"

export default class Landing extends Component {
    constructor(){
        super();
        this.state = {
            valid: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        // Update State variable
        this.setState({
            query: e.target.value
        });
    }
    handleSubmit(e) {
        // Handle Enter Press
        if (e.keyCode === 13) {
            this.setState({
                navigate:true
            })
        }
    }
    componentDidMount() {
        console.log("here")
        console.log(localStorage)
        if(localStorage.length >=1){
            console.log("here")
            document.getElementById("navProfile").style.display = "flex"
            document.getElementById("navLogout").style.display = "none"
            document.getElementById("navLogin").style.display = "none"
        }else{
            document.getElementById("navProfile").style.display = "none"
            document.getElementById("navLogout").style.display = "none"
            document.getElementById("navLogin").style.display = "flex"
        }
    }
    render() {
        // Redirect on search
        
        return (
            <div id="landing">
                <div>
                    <h1 id="search-title">Welcome</h1>
                    <div id="fridge">
                    <img id="fridge" alt="fridge" src={Fridge}></img>
                    </div>
                    <div id="subtext">
                        Make grocery shopping simple. 
                    </div>
                </div>
            </div>
        )
    }
}