import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = ({isAuth, user }) => {
  return (
    <header>
        <div className="logo">lms</div>
        <div className="link">
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/about">About</Link>
            {/* <Link to="/profile">Profile</Link> */}
            {isAuth ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
        </div>
    </header>
  )
}

export default Header;