import React, { useEffect, useState } from 'react'
import Profile from './Profile'

const Contact = () => {
   const [contact, setContact] = useState([])

    async function getContact() {
    const response = await fetch('https://curriculumapi.onrender.com/contact');
        const data = await response.json();
        console.log(data);
        console.log(data[0].name);
        setContact(data);
    }
    
    useEffect(() => {
        getContact();
    }, []);

  return (
    <div className='flex flex-col gap-1 justify-start'>
        <div className='bg-[#9AE1D3] m-5 rounded-xl border-2 	border-[#6E9289]'>
            <h3 className='text-2xl text-center text-black font-[LeagueSpartan]'>
                Contact
            </h3>
            {contact.length > 0 ? (
        <ul>
          {contact.map((data) => (
            <li key={data.id} className='mb-4'>
              <Profile nom={data.name} prenom={data.lastname} />
              <div className='text-xl font-[LeagueSpartan] text-left p-2'>
                <p><span>NOM : </span>{data.name}</p>
                <p><span>TEL : </span>{data.tel}</p>
                <p><span>EMAIL : </span>{data.email}</p>
                <p><span>ADRESSE : </span>{data.adress}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-xl text-center text-black font-[LeagueSpartan]'>Loading...</p>
      )}
        </div>
    </div>
  )
}

export default Contact