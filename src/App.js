import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Newsapp from './Components/Newsapp';
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup'; // Import the Signup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Newsapp />} />
        <Route path="/signup" element={<Signup />} /> {/* Add this line */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
