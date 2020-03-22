import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import jwt_decode from 'jwt-decode';


export default class ToDoList extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      user_id: '',
      re: '',
      items: []
    };
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    await this.setState ({
        name: decoded.identity.name,
        user_id: decoded.identity.id
      })
      console.log(this.state)
      
      this.getTask(this.state.user_id);
      
      
  }
  

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit(e) {
    e.preventDefault()

    const newTask = {
      name: this.state.name,
      user_id: this.state.user_id,
    }
    console.log(newTask)
    axios.post("http://localhost:5000/list",
          {
            name: newTask.name,
            user_id: newTask.user_id
          }
        )
        .then(res => {
          this.getTask(this.state.user_id);
          this.setState({
            task: ""
          });
          console.log(res);
          
        });
       
    }


  getTask = (id) => {
    axios.get("http://localhost:5000/list/" + id).then(res => {
      console.log(res);
      if (res.data) {
        this.setState({
          items: res.data.map(item => {
            let color = "green";

            return (
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={{ wordWrap: "break-word" }}>{item.name}</div>
                  </Card.Header>

                  
                </Card.Content>
              </Card>
            );
          })
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  
  render() {
    
    return (
      <div>
        <div id="landing">
          <Header className="header" as="h2">
            TO DO LIST
          </Header>
        </div>
        <div id="landing">
          <Form onSubmit={this.onSubmit}>
            <Input type="text" name="name"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
            <div id = "loginBody">
                    <button type="submit">
                      Create Task
                    </button>
            </div>
          </Form>
        </div>
        <div id="landing">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}
