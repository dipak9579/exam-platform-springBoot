import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // adjust the path if needed
import "./Navbar.css"

const Navbar = () => {
 

  return (
    <nav className="navbar">
      <h2 className="logo">Exam Port</h2>
      <div className="nav-links">
        <Link to="/">Back To Home</Link>
       
      </div>
    </nav>
  );
};

export default Navbar;
