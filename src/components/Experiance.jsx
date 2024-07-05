import React, { useState, useEffect } from 'react';

export default function Experience() {
    const [experiences, setExperiences] = useState([]);

    async function fetchExperiences() {
        const response = await fetch('https://curriculumapi.onrender.com/experiance');
        const data = await response.json();
        setExperiences(data);
    }

    useEffect(() => {
        fetchExperiences();
    }, []);

    return (
        <div>
            <h2 className="text-4xl text-center text-black bg-[#9AE1D3] rounded-3xl p-2 h-16 w-1/2 mx-auto" >Experiences</h2>

            {experiences.map((experience) => (
                <div key={experience._id} className=" rounded-lg shadow-md p-4">
                    <h3>{experience.company}</h3>
                    <p>{experience.position}</p>
                    <p>{experience.date}</p>
                    <p>{experience.description}</p>
                </div>
            ))}
        </div>
    );
}