import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {CommonContext} from '../App'

function Profile() {
   let navigate=useNavigate()

   let commonContext=useContext(CommonContext);
   var [firstname,setfirstname]=useState("");
   var [lastname,setlastname]=useState("");
   var [email,setEmail]=useState("");
   var [age,setAge]=useState("");
   var [mobile,setMobile]=useState("");
   var [password,setPassword]=useState("");
   
 
   let handleData=async()=>{
     let mail=localStorage.getItem('email')
     let res=await axios.post(`${commonContext.apiurl}/profile/${mail}`)
     setfirstname(res.data.users.firstname);
     setlastname(res.data.users.lastname);
     setEmail(res.data.users.email);
     setAge(res.data.users.age);
     setMobile(res.data.users.mobile);
     setPassword(res.data.users.password)
   }
  
   let handleSave=async()=>{
     let mail=localStorage.getItem('email')
    let res= await axios.put(`${commonContext.apiurl}/profile/${mail}`,{
       firstname,
       lastname,
       age,
       mobile
     })
     
   }
   let handleLogout=()=>{
     localStorage.clear();
     navigate('/signin')
   }
 
   useEffect(()=>{
     handleData()
   },[])
    return <>
    <div className='container'>
       <div className='row d-flex justify-content-center '>
        <div className='profileform col-sm-12 col-md-6 col-lg-4 '>
       <h1>Profile</h1>
       <Form>
       <Form.Group className="mb-3" controlId="formBasicFirstName">
           <Form.Control type="text" placeholder="Enter First Name" value={firstname} className="profile-input" onChange={(e)=>{setfirstname(e.target.value)}}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicLastName">
           <Form.Control type="text" placeholder="Enter Last Name" value={lastname} className="profile-input" onChange={(e)=>{setlastname(e.target.value)}}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicEmail">
           <Form.Control type="email" placeholder="Enter email" value={email} className="profile-input" disabled/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicAge">
           <Form.Control type="Number" placeholder="Enter Age" value={age} className="profile-input" onChange={(e)=>{setAge(e.target.value)}}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicMobile">
           <Form.Control type="Number" placeholder="Enter Mobile" value={mobile} className="profile-input" onChange={(e)=>{setMobile(e.target.value)}} />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" value={password} className="profile-input" disabled/>
        </Form.Group>
        
        
        <Button variant="primary" onClick={()=>{handleSave() }}>SAVE</Button>
        <Form.Group>
      <span class="material-symbols-outlined"  onClick={()=>{handleLogout()}}>logout</span>
      </Form.Group>
        </Form>
       </div>
       </div>
    </div>
    </>
}

export default Profile
