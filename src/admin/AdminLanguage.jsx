import React from "react";
import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { TbEyeX } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";
export default function AdminLanguage() {
  const [langue, setLangue] = useState([]);
  const [language, setLanguage] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [level, setLevel] = useState("");
  async function fetchLangues() {
    const response = await fetch("http://localhost:5000/langue");
    const data = await response.json();
    setLangue(Array.isArray(data) ? data : []);
    console.log(data);
  }

  useEffect(() => {
    fetchLangues();
  }, []);
  async function deleteLangue(id) {
    console.log(id)
    const response = await fetch(`http://localhost:5000/langue/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      enqueueSnackbar("langue supprime avec succes", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: "right", vertical: "top" },
      })
      fetchLangues();
    }
  }
  async function handleSave() {
    if (language !== "" && level !== "") {
      const response = await fetch("http://localhost:5000/langue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, level }),
      });
      if (response.ok) {
        const data = await response.json();
        enqueueSnackbar("langue ajoute avec succes", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { horizontal: "right", vertical: "top" },
        })
        console.log(data);
        fetchLangues();
        setLangue("");
        setLevel("");
        
      }
    }
  }

 async function addLangue() {
    setIsAdd(true);
  }

  async function handleCancel() {
    setIsAdd(false);
    setLanguage("");
    setLevel("");
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-96">
      <h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2">
        Langue
      </h2>
      <button
      className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-10 h-10"
      onClick={() => addLangue()}>
        <IoIosAddCircle size={30} />
      </button>
      {isAdd && (
        <div className="flex flex-wrap gap-6 justify-start p-4 bg-gray-100 rounded-lg">
          <input
            placeholder="Ajouter une langue"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            type="text"
             className="p-2 border rounded"
          />
          <select
            className="select select-info w-full max-w-xs"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option disabled selected value ={""}>
              Selectioner la langue
            </option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiere">Intermédiere</option>
            <option value="Avancé">Avancé</option>
            <option value="Maternel">Maternel</option>
          </select>
          <button onClick={() => handleSave()} className="hover:cursor-pointer flex items-center">
            <FaSave size={24} />
          </button>
          <button onClick={() => handleCancel()} className="hover:cursor-pointer flex items-center">
            <TbEyeX  size={30} />
          </button>
        </div>
      )}
      <table  className="w-full">
        {Array.isArray(langue) && langue.map((item) => (
         
            <tr key={item._id} className="">
              <th className="p-2">{item.language}</th>
              <td className="p-2 ">{item.level}</td>
              <td className="p-2 text-right">
                <button onClick={() => deleteLangue(item._id)}
                   className="text-red-500 hover:text-red-700">
                  <MdDeleteForever size={24} />
                </button>
              </td>
            </tr>
          
        ))}
      </table>
    </div>
  );
}
