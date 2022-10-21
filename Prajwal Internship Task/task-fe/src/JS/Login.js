import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {CommonContext} from '../App'

function Login() {
  let commonContext=useContext(CommonContext);
  let navigate=useNavigate();

  var [email,setEmail]=useState("");
  var [password,setPassword]=useState("");


  let handleLogin=async()=>{
    
    let res=await axios.post(`${commonContext.apiurl}/signin`,{
      email,
     password
     })
     localStorage.setItem('email',email);
     //navigate('/profile')
     if(res.data.statusCode===200){
      navigate('/profile')
     }
     
  }
  let handleForgot=()=>{
    navigate('/email')
 }
 let handleRegister=()=>{
   navigate('/signup')
 }

  return <>
  <div className='container'>
     <div className='row d-flex justify-content-center '>
        <div className='loginform col-sm-12 col-md-6 col-lg-4 '>
            <h1>Login</h1>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Control type="email" placeholder="Enter email" className="login-input" onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" className="login-input" onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
      
      <Form.Group >
         <Link to='/signup' className='login-forgot' onClick={()=>{handleForgot()}}>Forgot Password?</Link>  
      </Form.Group>

      <Button variant="primary"  onClick={()=>{handleLogin()}}>LOGIN</Button>

      <Form.Group>
        <p>Sign Up Using</p>
        <Link to='/signup' className="login-link" onClick={()=>{handleRegister()}}>SIGN UP</Link>  
      </Form.Group>
    </Form>
        </div>
     </div>
  </div>
  </>
}

export default Login
