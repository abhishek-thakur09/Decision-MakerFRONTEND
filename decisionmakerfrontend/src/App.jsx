import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import Navbar from './components/Navbar'; 
import PollForm from './components/PollFrom';

const App = () => {
  return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar stays here so it never reloads when switching pages */}
        <Navbar /> 
        
        <div className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pollform" element={<PollForm />}></Route>
          </Routes>
        </div>
      </div>
  );
};

export default App;