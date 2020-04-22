import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../src/images/fourSwans.png';
import Burger from '../../src/images/BurgerIcon.png';
import RightArrow from '../../src/images/RightArrow.png';

const Navbar = ({ user, setUser }) => {
  const [expanded, setExpanded] = useState(false);

  const logout = () => {
    axios.delete('/api/auth/logout').then(() => {
      setUser(null);
    });
  };

  const expander = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <h1>DanceParty</h1>
        {!expanded && (
          <button onClick={() => expander()}>
            <img src={Burger} alt="" />
          </button>
        )}
        {user && expanded && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/profile">Profile</Link>
              <Link onClick={logout} to="/">
                Logout
              </Link>
            </div>
            <button onClick={() => expander()}>
              <img src={RightArrow} style={{ width: '20px' }} alt="left arrow" />
            </button>
          </div>
        )}
        {!user && expanded && (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
