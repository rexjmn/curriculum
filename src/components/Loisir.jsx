import React from 'react'
import { useState, useEffect } from 'react'
export default function Loisir() {
    const [loisir, setLoisir] = useState([]);

    async function fetchLoisir() {
      const response = await fetch('http://localhost:5000/loisir');
          const data = await response.json();
          setLoisir(data);
          console.log(data);
    }
    
    useEffect(() => {
        fetchLoisir();
    }, []);

  return (
    <div>
        <h2 className='text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2'>Loisirs</h2>
        {loisir.length > 0 ? (
          <ul>
            {loisir.map((data) => (
              <li key={data._id}  className='mb-4'>
                <p>{data.loisir}</p>
                <p>{data._id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loisirs pas trouvé.</p>
        )}
      
    </div>
  )
}
