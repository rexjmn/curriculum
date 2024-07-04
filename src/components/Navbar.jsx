import React from "react";
import { Link } from "react-router-dom";
import rexlogo from "../assets/rexlogo.png"





export default function Navbar() {
  return (
    <nav className="bg-[#6E9289] flex justify-between h-[60px] items-center pr-10 ">
    <div className="p-4 relative top-6">
          <Link to="/"><img className="w-56" src={rexlogo} alt="" /></Link>

    </div>
     
      <div className=" hover:text-[#9AE1D3] text-lg">
          <Link to="/Admin">Admin</Link>

      </div>
    </nav>
  );
}
