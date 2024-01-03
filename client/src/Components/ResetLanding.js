import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import style from "../StyleSheets/ResetLanding.module.css";

import apiUrl from './apiConfig.js';

export default function ResetLanding() {
  const { password_reset_token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clientError, setClientError] = useState("");

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    // API call to check the validity of the token
    fetch(`${apiUrl}/password_resets/${password_reset_token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password || null,
        password_confirmation: confirmPassword || null,
      }),
    })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      setClientError(data);
    })
    .catch((error) => {
      console.error('Error checking token validity:', error.message);
    });
  };

  useEffect(() => {
    handleSubmit();
  }, [password_reset_token]);

  return (
    <div className={style.reset_panel}>
      <h1 className={style.heading}>Update Password</h1>
      <h3 style={{ color: "var(--secondary)"}}>{clientError}</h3>
      <form onSubmit={handleSubmit}>
        <div className={style.pass_input}>
          <label>
            New Password:&nbsp;
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <br />
        <div className={style.pass_input}>
          <label>
            Confirm Password:&nbsp;
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <br />
        <button className={style.pass_submit_button} type="submit">Submit</button>
      </form>
    </div>
  );
}
