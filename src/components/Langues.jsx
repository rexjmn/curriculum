import React from 'react'
import { useEffect, useState } from 'react'

export default function Langues() {
  const [langue, setLangue] = useState([]);
  async function fetchLangues() {
    const response = await fetch('http://localhost:5000/langue');
    const data = await response.json();
    setLangue(data);
    console.log(data);

  }

  useEffect(() => {
    fetchLangues();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100">
      <h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2 h-16 w-1/2 mx-auto">Langue</h2>
      {langue.map(item =>
        <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
          <table>
            <tr>
              <th className='p-2 '>{item.language}</th>
              <td className='p-2 '>{item.level}</td>
            </tr>
          </table>
        </div>)}
    </div>
  )
}
