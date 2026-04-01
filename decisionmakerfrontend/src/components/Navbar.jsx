
import React from 'react'
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center border-b border-gray-200 shadow-md shadow-gray-300/50 w-full h-20 mb-20'>
      <div className='bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-xl m-3 w-auto text-3xl font-bold align-middle cursor-default'
      onClick={()=> navigate("/")}
      >
      Quick Poll
      </div>
      <div className='bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold py-2 px-6 m-3 rounded-xl m-3 w-auto cursor-pointer'
      onClick={()=> navigate("/pollform")}
      >
        <span>+ </span>
        New Poll
      </div>
    </div>
  )
}

export default Navbar
