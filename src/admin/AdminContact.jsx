import React from 'react'
import { useState, useEffect } from 'react'
import { enqueueSnackbar } from "notistack";
export default function AdminContact() {
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [adress, setAdress] = useState("")

    async function fetchContact() {
        const response = await fetch('https://curriculumapi.onrender.com/contact');
            const data = await response.json();
            console.log(data);
            console.log(data[0].name);
            setNom(data[0].name);
            setPrenom(data[0].lastname);
           setTel(data[0].tel);
           setEmail(data[0].email);
           setAdress(data[0].adress);

    }
    
    useEffect(() => {
        fetchContact();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        fetch('https://curriculumapi.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nom, lastname: prenom, tel, email, adress }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            enqueueSnackbar("contact ajoute avec succes", {
                variant: "success",
                autoHideDuration: 3000,
                anchorOrigin: { horizontal: "right", vertical: "top" },
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
  return (
  
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Contact Information</h2>
        <div className="mb-4">
          <label htmlFor="tel" className="block text-gray-700">TEL</label>
          <input
            type="text"
            placeholder="Taper votre TEL"
            value={tel}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">EMAIL</label>
          <input
            type="text"
            placeholder="Taper votre EMAIL"
            value={email}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adress" className="block text-gray-700">ADRESS</label>
          <input
            type="text"
            placeholder="Taper votre ADRESS"
            value={adress}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}