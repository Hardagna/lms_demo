import React from 'react';
import './auth.css';
import { Link } from 'react-router-dom';

const Verify = () => {
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify your email</h2>
        <form>
          <label htmlFor="code">Enter the verification code</label>
          <input type="number" required />

          <button type="submit" className='commonBtn'>Verify</button>
        </form>
        <p>
          Continue your <Link to="/login">login</Link> process
        </p>
      </div>
    </div>
  )
}

export default Verify;