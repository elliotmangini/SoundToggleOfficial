import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import apiUrl from '../apiConfig.js';

import style from '../StyleSheets/SignUp.module.css';

export default function SignUp({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [selectedTag, setSelectedTag] = useState(""); // Default selected tag
  const [selectedFound, setSelectedFound] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [foundUsInput, setFoundUsInput] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        tag: selectedTag === "Other" ? tagInput : selectedTag,
        found_us: selectedFound === "Other" ? foundUsInput : selectedFound,
      }),
      
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      {user ? <Navigate to={`/${user.username}`} /> : null}

      <form onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        {errors.map((err) => (
          <p key={err}>{err}</p>
        ))}
        <div>
          <input
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div>
          <input
            type="password"
            id="password_confirmation"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <h2>Who are you?</h2>
        <div>
          <div className={style.tag_button_container}>
            {/* Tag selection buttons */}
            {["Engineer", "Educator", "Artist", "Other"].map(function(option) {
              return (
                <button
                  key={option}
                  type="button"
                  className={`${style.tag_button} ${selectedTag === option ? style.selected : ""}`}
                  onClick={() => setSelectedTag(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {selectedTag === "Other" && (
            <input
              type="text"
              id="tag_input"
              placeholder="Please specify"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
          )}
        </div>
        <h2>How did you find us?</h2>
        <div>
          <div className={style.tag_button_container}>
            {/* "How did you found us?" selection buttons */}
            {["Search", "Facebook", "Reddit", "Other"].map(function(option) {
              return (
                <button
                  key={option}
                  type="button"
                  className={`${style.tag_button} ${selectedFound === option ? style.selected : ""}`}
                  onClick={() => setSelectedFound(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {selectedFound === "Other" && (
            <input
              type="text"
              id="found_us_input"
              placeholder="Please specify"
              value={foundUsInput}
              onChange={(e) => setFoundUsInput(e.target.value)}
            />
          )}
        </div>
        <div>
          <button className={style.signup_button} type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
        </div>
      </form>
      <p style={{ marginBottom: 0, marginTop: '20px' }}>Already a member?</p>
      <Link to="/login">Log In</Link>
    </>
  );
}
