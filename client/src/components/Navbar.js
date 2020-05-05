import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackArrow from '../images/LeftArrowWhite.png';

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    axios.delete('/api/auth/logout').then(() => {
      setUser(null);
    });
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={BackArrow} alt="Logo" />
        </Link>
        <Link to="/">
          <h1>DancerParty</h1>
        </Link>
        {user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/profile">Profile</Link>
              <Link onClick={logout} to="/">
                Logout
              </Link>
            </div>
          </div>
        )}
        {!user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
