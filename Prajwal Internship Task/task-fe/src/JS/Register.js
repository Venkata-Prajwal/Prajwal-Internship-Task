import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {CommonContext} from '../App'

function Register() {
   let commonContext=useContext(CommonContext);
  let navigate=useNavigate()
  
  var [firstname,setfirstname]=useState("");
  var [lastname,setlastname]=useState("");
  var [email,setEmail]=useState("");
  var [age,setAge]=useState("");
  var [mobile,setMobile]=useState("");
  var [password,setPassword]=useState("");
  
  

 
  async function handleSubmitSql(){

    navigate('/signin');
   await axios.post(`${commonContext.apiurl}/signup`,{
    firstname,
    lastname,
    email,
    age,
    mobile,
    password
   })
   }

  async function handleSubmitMongo(){

    let res=await axios.post(`${commonContext.apiurl}/signupm`,{
      firstname,
      lastname,
      email,
      age,
      mobile,
      password
     })
     if(res.data.statusCode===200){
      navigate('/signin')
     }
     
  }
  return <>
  <div className='container'>
     <div className='row d-flex justify-content-center '>
        <div className='registerform col-sm-12 col-md-6 col-lg-4 '>
     <h1>Register</h1>
     <Form>
     <Form.Group className="mb-3" controlId="formBasicFirstName">
         <Form.Control type="text" placeholder="Enter First Name" className="register-input" onChange={(e)=>{setfirstname(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
         <Form.Control type="text" placeholder="Enter Last Name" className="register-input" onChange={(e)=>{setlastname(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Control type="email" placeholder="Enter email" className="register-input" onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAge">
         <Form.Control type="Number" placeholder="Enter Age" className="register-input" onChange={(e)=>{setAge(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMobile">
         <Form.Control type="Number" placeholder="Enter Mobile" className="register-input" onChange={(e)=>{setMobile(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" className="register-input" onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
      
      
      <Button variant="primary" type="submit" onClick={()=>{handleSubmitSql();handleSubmitMongo()}}>SUBMIT</Button>
      </Form>
     </div>
     </div>
  </div>
  </>
}

export default Register
