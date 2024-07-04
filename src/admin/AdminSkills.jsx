import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { TbEyeX } from "react-icons/tb";
import { IoIosAddCircle } from "react-icons/io";
import { enqueueSnackbar } from "notistack";

export default function AdminSkills() {
  const [competence, setCompetence] = useState([]);
  const [skill, setSkill] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  async function fetchSkills() {
    const response = await fetch("http://localhost:5000/competence");
    const data = await response.json();
    setCompetence(data);
    console.log(data);
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  async function deleteSkill(id) {
    const response = await fetch(`http://localhost:5000/competence/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      enqueueSnackbar("competence supprime avec succes", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      console.log(data);
      fetchSkills();
    }
  }
  async function handleSave() {
    if (skill !== "") {
      const response = await fetch("http://localhost:5000/competence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: skill }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        enqueueSnackbar("competence ajoute avec succes", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        fetchSkills();
        setSkill("");
      }
    }
    function handleCancel() {
      setIsAdd(false);
      setSkill("");
    }
  }
  function addSkiill() {
    setIsAdd(true);
  }
  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-96">
      <h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2">
        Competances
      </h2>
      {!isAdd && (
        <button
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-10 h-10"
          onClick={() => addSkiill()}
        >
          <IoIosAddCircle size={40} />
        </button>
      )}
      {isAdd && (
        <div className="flex flex-col gap-6 justify-start p-4 bg-gray-100 rounded-lg">
          <input
            value={skill}
            type="text"
            placeholder="Ajouter une competance"
            onChange={(e) => setSkill(e.target.value)}
            className="p-2 border rounded"
          />
          <div className="flex gap-6">
            <button
              onClick={handleSave}
              className="hover:cursor-pointer flex items-center"
            >
              <FaSave size={24} />
            </button>
            <button
              onClick={() => setIsAdd(false)}
              className="hover:cursor-pointer flex items-center"
            >
              <TbEyeX size={30} />
            </button>
          </div>
        </div>
      )}
      {competence.map((data) => (
        <div className="flex items-center justify-between p-2 border-b">
          <table key={data._id} className="flex flex-col">
            <tr>
              <th>{data.skills}</th>
            </tr>
          </table>
          <button
            onClick={() => {
              deleteSkill(data._id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <MdDeleteForever size={24} />
          </button>
        </div>
      ))}
    </div>
  );
}
