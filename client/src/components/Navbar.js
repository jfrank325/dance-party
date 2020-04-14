import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../src/images/fourSwans.png';

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    axios.delete('/api/auth/logout').then(() => {
      setUser(null);
    });
  };

  if (user) {
    return (
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </nav>
    );
  }

  // .navbar {
  //   background-color: deepskyblue;
  //   min-height: 50px;
  //   width: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   margin-bottom: 20px;
  // }
  return (
    <nav className="navbar bg-blue-300 min-h-12 w-full flex items-center justify-between mb-12">
      <Link to="/">
        <img style={{ width: '50px' }} src={Logo} alt="Logo" />
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navbar;
