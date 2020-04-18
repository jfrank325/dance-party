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
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <h1>DanceParty</h1>
        <div className="auth-links">
          <Link onClick={logout} to="/">
            Logout
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <h1>DanceParty</h1>
      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
