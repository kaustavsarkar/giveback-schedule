import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

function Header(): JSX.Element {
  return (
    <div>
      <div className="home-navbar">
        <h2>Giveback Schedule</h2>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
}

export default Header;
