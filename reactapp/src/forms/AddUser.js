import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../context";
import Axios from 'axios';

const Animation = posed.div({
  visible:{
    opacity:1,
    applyAtStart:{
      display:"block"
    }

  },
  hidden:{
    opacity:0,
    applyAtEnd:{
      display:"none"
    }

  }
});
class AddUser extends Component {
  state={
    visible: false,
    name:"",
    depart:"",
    salary:"",
    error:false
  }
  changeVisibility = (e) =>{
    this.setState({
      visible:!this.state.visible
    });
  }

  validateForm = () => {
    const {name,salary,depart}=this.state;
    if(name===""||salary===""||depart===""){
      return false;
    }
    return true;
  }

  //Formda herhangi bir veri değiştiğinde state güncelleniyor
  changeInput = (e) => {
    this.setState({
      [e.target.name]:e.target.value,
    })
  }

  addUser = async(dispatch,e) => {
    e.preventDefault();
    const {name,depart,salary} = this.state;

    const newUser = {
      name,
      depart,
      salary
    }

    if(!this.validateForm()){
      this.setState({
        error:true
      })
      return;
    }

    const response = await Axios.post("http://localhost:3004/users",newUser);

    dispatch({type:"ADD_USER",payload:response.data});

    //Redirect
    this.props.history.push("/");
  }

  render() {
    const {visible,name,depart,salary,error}=this.state;
    return <UserConsumer>
      {
        value => {
          const {dispatch} = value
          return (
            <div className="col-md-8 mb-4">
      
              <button onClick = {this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible?"Hide Form":"Show Form"}</button>
      
              <Animation pose={visible?"visible":"hidden"}>
                <div className="card">
                  <div className="card-header">
                    <h4>Add User Form</h4>
                  </div>
                  
                  <div className="card-body">
                    {
                      error?
                      <div className="alert alert-danger">
                        Lütfen bilgilerinizi kontrol edin!
                      </div>
                      :null

                    }
                    <form onSubmit={this.addUser.bind(this,dispatch)}> 
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                        name="name"
                        id="id"
                        placeholder="Enter Name"
                        className="form-control"
                        value={name}
                        onChange={this.changeInput}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="depart">Department</label>
                        <input type="text"
                        name="depart"
                        id="depart"
                        placeholder="Enter Department"
                        className="form-control"
                        value={depart}
                        onChange={this.changeInput}
                        />
                      </div>
      
                      <div className="form-group">
                        <label htmlFor="salary">Salary</label>
                        <input type="text"
                        name="salary"
                        id="salary"
                        placeholder="Enter Salary"
                        className="form-control"
                        value={salary}
                        onChange={this.changeInput}
                        />
                      </div>
                      
                      <button className="btn btn-danger btn-block" type="submit">Add User</button>
      
                    </form>
                  </div>
                </div>
              </Animation>
              
            </div>
          )
        }

      }
    </UserConsumer>
    
  }
}

export default AddUser;