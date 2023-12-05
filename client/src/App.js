import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./StyleSheets/App.css"; // color variables defined here

import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";
import UserProfile from "./Components/UserProfile";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import AudioPlayer from "./Components/AudioPlayer";
import ContactUs from "./Components/ContactUs";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import Setup from "./Components/Setup";
import Pricing from "./Components/Pricing";
import PasswordReset from "./Components/PasswordReset";
import Waitlist from "./Components/Waitlist";

export default function App() {
  const [user, setUser] = useState(null);
  const [playlistToDisplay, setPlaylistToDisplay] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on route change
  }, [location]);

  useEffect(() => {
    if (location.pathname.endsWith("/export")) {
      document.body.style.backgroundColor = "transparent";
    }
  });


  function getOwnInfo() {
    fetch('api/me')
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return null;
      })
      .then((userData) => {
        setUser(userData);
        setIsLoadingUser(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingUser(false);
      });
  }

  function fetchPlaylist(username, playlistUrl = "default") {
    console.log(
      `Fetching playlist endpoint: /playlists/${username}/${playlistUrl}`
    );
    fetch(`api/playlists/${username}/${playlistUrl}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to fetch playlist.");
        }
      })
      .then((data) => {
        console.log("succesfully fetched playlist:");
        console.log(data);
        setPlaylistToDisplay(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getOwnInfo();
  }, []);


  return (
    <>
      {!location.pathname.endsWith("/export") && <NavBar user={user} />}
      <Routes>
        <Route
          path="/"
          element={
            <Hero
              fetchPlaylist={fetchPlaylist}
              playlistToDisplay={playlistToDisplay}
              setPlaylistToDisplay={setPlaylistToDisplay}
              user={user}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        {isLoadingUser ? (
          <Route path="/*" element={<p>Loading...</p>} />
        ) : (
          <>
            <Route
              path="/:urlUsername"
              element={
                <UserProfile
                  playlistToDisplay={playlistToDisplay}
                  setPlaylistToDisplay={setPlaylistToDisplay}
                  fetchPlaylist={fetchPlaylist}
                  user={user}
                  setUser={setUser}
                  getOwnInfo={getOwnInfo}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              }
            />
            {/* individual playlists as viewable from inside the site */}
            <Route
              path="/:urlUsername/:urlPlaylist/*"
              element={
                <AudioPlayer
                  playlist={playlistToDisplay}
                  fetchPlaylist={fetchPlaylist}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              }
            />
          </>
        )}
        <Route path="/logout" element={<Logout setUser={setUser} />} />{" "}
        {/* this is here for utility */}
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/setup" element={<Setup user={user} />} />
        <Route path="/pricing" element={<Pricing user={user} />} />
        <Route path="/admin" element={<Admin user={user} />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        {/* EXPORTED ROUTES */}
        <Route
          path="/export/:urlUsername/:urlPlaylist/*"
          element={
            <AudioPlayer
              playlist={playlistToDisplay}
              setPlaylistToDisplay={setPlaylistToDisplay}
              fetchPlaylist={fetchPlaylist}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          }
        />

        {/* exporting route */}
        <Route
          path="/:urlUsername/:urlPlaylist/export"
          element={
            <AudioPlayer
              playlist={playlistToDisplay}
              fetchPlaylist={fetchPlaylist}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          }
        />

        <Route
        path="waitlist"
        element={
          <Waitlist
          />
        }
        />
      </Routes>
      {/* turn me back on later */}
      {/* {(user && user?.power !== "admin") && (!location.pathname.endsWith("/export")) ? <ContactUs /> : null} */}
    </>
  );
}
