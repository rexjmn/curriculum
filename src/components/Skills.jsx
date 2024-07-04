import React from 'react'
import { useEffect, useState } from 'react'
const Skills = () => {
  const [competence, setCompetence] = useState([]);
  async function fetchSkills() {
    const response = await fetch('http://localhost:5000/competence');
        const data = await response.json();
        setCompetence(data);
        console.log(data);
     
}

useEffect(() => {
    fetchSkills();
}, []); 

  return (
    <div className='flex flex-col gap-1 justify-start'>
<div >
<h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2 w-2/3">Competances</h2>
{competence.length > 0 ? (
  <ul>
    {competence.map((data) => (
      <li key={data._id}  className='mb-4'>
        <p>{data.skills}</p>
        <p>{data._id}</p>
      </li>
    ))}
  </ul>
) : (
  <p>No skills found.</p>
)}
</div>

    </div>
  )
}

export default Skills