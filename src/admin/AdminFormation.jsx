import React from 'react'
import { useState, useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { TbEyeX } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";

export default function AdminFormation() {
    const [formation, setFormation] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [school, setSchool] = useState("")

    async function fetchFormations() {
        const response = await fetch("http://localhost:5000/formation")
        const data = await response.json()
        setFormation(Array.isArray(data) ? data : [])
        console.log(data)
    }
    useEffect(() => {
        fetchFormations()
    }, [])

    async function deleteFormation(id){
        console.log(id);
        const response = await fetch(`http://localhost:5000/formation/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            enqueueSnackbar("formation supprime avec succes", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { horizontal: "right", vertical: "top" },
            })
            fetchFormations();
        }
    }

    async function handleSave() {
        if (title !== "" && description !== "" && date !== "" && school !== "") {
            const response = await fetch("http://localhost:5000/formation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, date, school }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                enqueueSnackbar("formation ajoute avec succes", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { horizontal: "right", vertical: "top" },
                })
                fetchFormations();
                setTitle("");
                setDescription("");
                setDate("");
                setSchool("");
            }
        }
    }

    async function addFormation() {
        setIsAdd(true)
    }

    async function handleCancel() {
        setIsAdd(false)
        setTitle("")
        setDescription("")
        setDate("")
        setSchool("")
    }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-[600px]">
      <h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2">Formation</h2>
      <button
      className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-10 h-10">
        <IoIosAddCircle size={30} />
      </button>
      {isAdd && (
          <div>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
            <input
              type="text"
              placeholder="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
              <input
                type="text"
                placeholder="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleSave}
          >
            <FaSave size={30} />
          </button>
          <button
            onClick={handleCancel}
          >
            <TbEyeX size={30} />
          </button>
        </div>
      )}
      {Array.isArray(formation) && formation.map((data) => (
        <div key={data._id} className='flex items-center justify-between p-2 border-b'>
         <div>
            <table key={data._id} className="flex flex-col">
              <tr>
                <td><span className='font-black'>{data.title}</span></td>
              </tr>
              <tr>
                <td><span className='font-sans text-left'>{data.school}</span></td>
              </tr>
              <tr>
                <td className='font-light text-left'><span >{data.date}</span></td>
              </tr>
              <tr>
                <td className='font-sans text-left'><span >{data.description}</span></td>
              </tr>
            </table>
         </div>
          <button
            onClick={() => deleteFormation(data._id)}
            className="text-red-500 hover:text-red-700 hover:cursor-pointer"
          >
            <MdDeleteForever size={30} />
          </button>
        </div>
      ))}
    </div>
    
  )
}
