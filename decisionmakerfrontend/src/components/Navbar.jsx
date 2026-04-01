import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex justify-between items-center">
        {/* Left */}
        <div
          className="cursor-pointer group flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            Q
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-purple-700 bg-clip-text text-transparent sm:block">
            Quick Poll
          </h1>
        </div>

        {/*right */}
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-medium py-2 px-4 md:px-6 rounded-full shadow-lg shadow-purple-200 transition-all active:scale-95"
          onClick={() => navigate("/pollform")}
        >
          <span className="text-xl font-bold">+</span>
          <span className="text-sm md:text-base">New Poll</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
