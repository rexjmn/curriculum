import { enqueueSnackbar } from 'notistack'
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { TbEyeX } from "react-icons/tb";
import { useState, useEffect } from 'react'
export default function AdminLoisir() {
    const [loisir, setLoisir] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [hoby, setHoby] = useState("")

   

    async function fetchLoisirs() {
        const response = await fetch("https://curriculumapi.onrender.com/loisir")
        const data = await response.json()
        setLoisir(Array.isArray(data) ? data : [])
        console.log(data)
    }
    useEffect(() => {
        fetchLoisirs()
    }, [])

    async function deleteLoisir(id) {
        const response = await fetch(`https://curriculumapi.onrender.com/loisir/${id}`, {
            method: "DELETE",

        })
        if (response.ok) {
            const data = await response.json()
            enqueueSnackbar("loisir supprime avec succes", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { horizontal: "right", vertical: "top" },
            })
            console.log(data)
            fetchLoisirs()
        }
    }

    async function handleSave() {
        if (hoby !== "") {
            const response = await fetch("https://curriculumapi.onrender.com/loisir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ hoby }),
            })
            if (response.ok) {
                const data = await response.json()
                enqueueSnackbar("loisir ajoute avec succes", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { horizontal: "right", vertical: "top" },
                })
                console.log(data)
                fetchLoisirs()
                setHoby("")
            }
        }
    }

    async function addLoisir() {
        setIsAdd(true)
    }

    async function handleCancel() {
        setIsAdd(false)
        setHoby("")
    }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-96">
      <h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2">Loisir</h2>
      {!isAdd && (
        <button
          onClick={addLoisir}
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-10 h-10"
        >
          <IoIosAddCircle size={30} />
        </button>
      )}
      {isAdd && (
        <div className="flex flex-wrap gap-6 justify-start p-4 bg-gray-100 rounded-lg">
          <input
            type="text"
            value={hoby}
            onChange={(e) => setHoby(e.target.value)}
            placeholder="Ajouter une loisir"
            className='p-2 border rounded'
            />
          <button
             className="hover:cursor-pointer flex items-center"
            onClick={handleSave}
          >
            <FaSave size={30} />
          </button>
          <button
            className="hover:cursor-pointer flex items-center"
            onClick={() => setIsAdd(false)}
          >
            <TbEyeX size={30} />
          </button>
        </div>
      )}
      {Array.isArray(loisir) && loisir.map((data) => (
                <div key={data._id} className='flex items-center justify-between p-2 border-b'>
                    <table key={data._id} className="flex flex-col">
                        <tr>
                            <td>{data.loisir}</td>
                        </tr>
                    </table>
                    <button
                        onClick={() => deleteLoisir(data._id)}
                        className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                    >
                        <MdDeleteForever size={30} />
                    </button>
                </div>
            ))}
    </div>
  )
}
