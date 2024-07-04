import React from 'react'
import Contact from '../components/Contact'
import Skills from '../components/Skills'
import Profile from '../components/Profile'
import Langues from '../components/Langues'
import Loisir from '../components/Loisir'
import Formation from '../components/Formation'
import Experience from '../components/Experiance'

const Home = () => {
  return (
    <div className='bg-[#F6F6F6]'>
      
        <main>
       
        {/* <Profile /> */}
        <Contact  />
        <Skills />
        <Langues />
        <Loisir />
        <Formation />
        <Experience />
       
        
        </main>
    </div>
  )
}

export default Home