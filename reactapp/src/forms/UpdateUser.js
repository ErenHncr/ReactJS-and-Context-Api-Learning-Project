import React, { Component } from 'react'
import UserConsumer from "../context";
import Axios from 'axios';

class UpdateUser extends Component {
  state={
    name:"",
    depart:"",
    salary:"",
    error:false
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
  componentDidMount = async() => {
    const {id}=this.props.match.params;
    const response= await Axios.get(`http://localhost:3004/users/${id}`);
    const {name,salary,depart}=response.data;

    this.setState({
      name,
      salary,
      depart
    });

  }
  updateUser = async(dispatch,e) => {
    e.preventDefault();
    // Update User
    const {id}=this.props.match.params;
    const {name,salary,depart}=this.state;
    const updatedUser={
      name,
      salary,
      depart
    };

    if(!this.validateForm()){
      this.setState({
        error:true
      })
      return;
    }

    const response = await Axios.put(`http://localhost:3004/users/${id}`,updatedUser);

    dispatch({type:"UPDATE_USER",payload:response.data});

    //Redirect
    this.props.history.push("/");
  }

  render() {
    const {name,depart,salary,error}=this.state;
    
    return <UserConsumer>
      {
        value => {
          const {dispatch} = value
          return (
            <div className="col-md-8 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h4>Update User Form</h4>
                  </div>
      
                  <div className="card-body">
                    {
                      error?
                      <div className="alert alert-danger">
                        Lütfen bilgilerinizi kontrol edin!
                      </div>
                      :null

                    }
                    <form onSubmit={this.updateUser.bind(this,dispatch)}> 
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
                      
                      <button className="btn btn-danger btn-block" type="submit">Update User</button>
      
                    </form>
                  </div>
                </div>
             
            </div>
          )
        }

      }
    </UserConsumer>
    
  }
}

export default UpdateUser;