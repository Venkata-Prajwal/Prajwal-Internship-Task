import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './JS/Login';
import Register from './JS/Register';
import Profile from './JS/Profile'
import React from 'react';
import ForgotPassword from './JS/ForgotPassword'
import Email from './JS/Email'


export const CommonContext=React.createContext();
const apiurl='http://localhost:8000'
function App() {
  return <>
  <BrowserRouter>
  <CommonContext.Provider value={{apiurl}}>
    <Routes>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
         <Route path='/forgotpass' element={<ForgotPassword/>}/>
          <Route path='/email' element={<Email/>}/>
        {/* <Route path='*' element={Navigate to='/new-issue'}/> */}
    </Routes>
    </CommonContext.Provider>
  </BrowserRouter>
  </>
}

export default App;
