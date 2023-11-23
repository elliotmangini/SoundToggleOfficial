import React, { useState } from "react";
import Error from "./Error";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import style from '../StyleSheets/Login.module.css';

export default function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((data) => setUser(data));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      {/* FORWARD PATH */}
      {user ? <Navigate to={`/${user.username}`} /> : null}


      <form className={style.login_form} onSubmit={handleSubmit}>
        <div>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
          <input
            type="text"
            id="username"
            placeholder="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="password"
            // autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={style.button_and_forgot}>
          <div>
            <button className={style.login_button} variant="fill" color="primary" type="submit">
              {isLoading ? "Loading..." : "Login"}
            </button>
          <div className={style.forgot_container}>
            <a 
              className={style.forgot_password_link}
              href="/passwordreset"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        </div>
      </form>

      <p className={style.new_here}>Don't have an account?</p>
      <Link to="/signup">Sign up</Link>
    </>
  );
}
