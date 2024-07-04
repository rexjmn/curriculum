import React from 'react'
import AdminContact from '../admin/AdminContact'
import AdminSkills from '../admin/AdminSkills'
import AdminLanguage from '../admin/AdminLanguage'
import { useState } from 'react'
import Login from './Login'
import AdminLoisir from '../admin/AdminLoisir'
import AdminFormation from '../admin/AdminFormation'
import AdminExperiance from '../admin/AdminExperiance'


const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");





 function handlesubmit (e) {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    }
  }

  if (!isLoggedIn) {
    
    return (
      <Login 
      username={username} 
      password={password} 
      setUsername={(e) => setUsername (e.target.value)} 
      setPassword={(e) => setPassword (e.target.value)} 
      handlesubmit={handlesubmit}/>
    )

  }

  return (
    <div>
      
      <AdminContact />
      <div className='flex flex-wrap flex-row justify-center'>
      <AdminSkills />
      <AdminLanguage />
      <AdminLoisir />
      <AdminFormation />
      <AdminExperiance />
      </div>
    </div>
  )
}

export default Admin