import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-20">
      <div className="text-2xl font-bold text-teal-700 tracking-tight">
        WASH Health
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl focus:outline-none"
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </div>
      <ul className={`flex-col md:flex-row md:flex space-x-0 md:space-x-6 text-gray-700 font-medium absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 transition-all duration-300 ease-in ${open ? 'flex' : 'hidden'} md:flex`}>
        <li>
          <Link to="/" className="block px-4 py-2 hover:text-teal-600" onClick={() => setOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/about" className="block px-4 py-2 hover:text-teal-600" onClick={() => setOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/contact" className="block px-4 py-2 hover:text-teal-600" onClick={() => setOpen(false)}>Contact</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar; 