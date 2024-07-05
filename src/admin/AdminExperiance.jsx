import React from 'react'
import { useState, useEffect } from 'react'
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { TbEyeX } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";


export default function AdminExperiance() {
    const [experiance, setExperiance] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")

    async function fetchExperiances() {
        const response = await fetch("https://curriculumapi.onrender.com/experiance")
        const data = await response.json()
        setExperiance(Array.isArray(data) ? data : [])
        console.log(data)
    }
    useEffect(() => {
        fetchExperiances()
    }, [])

    async function deleteExperiance(id){
        console.log(id);
        const response = await fetch(`https://curriculumapi.onrender.com/experiance/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            enqueueSnackbar("experiance supprime avec succes", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { horizontal: "right", vertical: "top" },
            })
            fetchExperiances();
        }
    }

    async function handleSave() {
        if (company !== "" && position !== "" && date !== "" && description !== "") {
            const response = await fetch("https://curriculumapi.onrender.com/experiance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ company, position, date, description }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                enqueueSnackbar("experiance ajoute avec succes", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { horizontal: "right", vertical: "top" },
                })
                fetchExperiances();
                setCompany("");
                setPosition("");
                setDate("");
                setDescription("");
            }   
        }
    }

    async function addExperiance() {
        setIsAdd(!isAdd)
    }

    async function handleCancel() {
        setIsAdd(false)
        setCompany("")
        setPosition("")
        setDate("")
        setDescription("")
    }
    
  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-[600px]">
      <h2  className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2" >Experience</h2>
      <button className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-10 h-10">
        <IoIosAddCircle size={30} />
      </button>
      {isAdd && (
        <div>
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-10 h-10"
            onClick={handleSave}
          >
            <FaSave size={30} />
          </button>
          <button
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-10 h-10"
            onClick={handleCancel}
          >
            <TbEyeX size={30} />
          </button>
        </div>
      )}
      {Array.isArray(experiance) && experiance.map((data) => (
          <div className='flex items-center justify-between p-2 border-b'>
            <table key={data._id} className="flex flex-col">
              <tr>
                <td><span className='font-black'>{data.company}</span></td>
                </tr>
                <tr>
                <td><span className='font-sans text-left'>{data.position}</span></td>
                </tr>
                <tr>
                <td><span>{data.date}</span></td>
                </tr>
                <tr>
                <td className='font-sans text-left'><span>{data.description}</span></td>
                </tr>
                <tr>
                <button
                   className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                  onClick={() => deleteExperiance(data._id)}
                >
                  <MdDeleteForever size={30} />
                </button>
                </tr>
            </table>
          </div>
      ))}
    </div>
  )
}
