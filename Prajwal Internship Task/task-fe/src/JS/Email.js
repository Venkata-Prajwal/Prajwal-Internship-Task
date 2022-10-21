import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import {CommonContext} from '../App'

function Email() {
    let commonContext=useContext(CommonContext);
    let navigate=useNavigate();
    let [email,setEmail]=useState("")

    let handleEmail=()=>{
        localStorage.setItem('email',email)
        navigate('/forgotpass')
    }
  return <>
  <div className="container">
    <div className="row d-flex justify-content-center ">
       <div className='emailform col-sm-12 col-md-6 col-lg-4'>
        <h1>Few Steps Ahead</h1>
  <Form>
        
      <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Control type="text" placeholder="Enter Email" className='email-input' onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Group>

      <Button variant="primary"  onClick={()=>{handleEmail()}}>Submit</Button>
    
    </Form>
    </div>
    </div>
    </div>
  </>
  
}

export default Email
