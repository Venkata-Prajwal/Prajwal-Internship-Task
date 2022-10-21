import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {CommonContext} from '../App'

function ForgotPassword() {
    let commonContext=useContext(CommonContext);
    let navigate=useNavigate()

    let [password,setPassword]=useState("")
    let [confirmPassword,setConfirmPassword]=useState("")

   let handleSubmit=async()=>{
    let email=localStorage.getItem('email')
    let res=await axios.put(`${commonContext.apiurl}/forgotpassm/${email}`,{
       password,confirmPassword
       })
      if(res.data.statusCode===200){
        navigate('/signin');
        localStorage.clear()
      }
    }
  return<>
   <div className="container">
    <div className="row d-flex justify-content-center ">
       <div className='forgotform col-sm-12 col-md-6 col-lg-4'>
       <h1>Forgot Password?</h1>
  <Form>
      

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Control type="password" placeholder="Enter Password" className='forgot-input' onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Control type="password" placeholder="Confirm Password" className='forgot-input' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
      </Form.Group>

     
      
      <Button variant="primary"  onClick={()=>{handleSubmit()}}>Submit</Button>
      
    </Form>
    </div>
    </div>
    </div>
  </>
}

export default ForgotPassword
