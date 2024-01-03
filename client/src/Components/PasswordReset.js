import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate

import apiUrl from '../apiConfig.js';

import style from "../StyleSheets/PasswordReset.module.css";


export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending email for password reset)
    console.log('Email submitted:', email);
    // Simulate POST request to password resets endpoint
    fetch(`${apiUrl}/password_resets`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Success response (2xx status codes)
          setError('');
          alert("If an account with that email was found, they will receive a password reset email.");
          navigate('/'); // Redirect to the root route
        } else {
          // Handle other status codes (error responses)
          return response.json(); // Parse error response JSON
        }
      })
      .then((data) => {
        if (data && data.error) {
          // Display error message based on the response
          setError(data.error);
        }
      })
      .catch((error) => {
        // Handle any fetch errors
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className={style.request_panel}>
      <h1 className={style.heading}>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.email_input}>
          <label>Email:&nbsp;
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div>
          <button className={style.email_submit_button} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
