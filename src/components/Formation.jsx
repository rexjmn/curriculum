import React from 'react'
import { useEffect, useState } from 'react'

export default function Formation() {
    const [formation, setFormation] = useState([]);

    async function fetchFormations() {
        const response = await fetch('https://curriculumapi.onrender.com/formation');
        const data = await response.json();
        setFormation(data);
        console.log(data);
    }
    useEffect(() => {
        fetchFormations();
    }, []);
  return (
    <div>
      <h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2 w-2/3"    >Formation</h2>
      {formation.length > 0 ? (
        <ul>
          {formation.map((data) => (
            <li key={data._id}  className='mb-4'>
              <p>{data.title}</p>
              <p>{data.school}</p>
              <p>{data.date}</p>
              <p>{data.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No formation found.</p>
      )}
    </div>
  )
}
