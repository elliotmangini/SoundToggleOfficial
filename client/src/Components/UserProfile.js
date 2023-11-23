import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Avatar from "../Assets/placeholder-avatar.png";

import style from "../StyleSheets/UserProfile.module.css";
import plusIcon from "../Assets/plus_icon.png";

import Logout from "./Logout.js";
import AudioPlayer from "./AudioPlayer.js";
import FacebookIcon from "./FacebookIcon";
import SoundcloudIcon from "./SoundcloudIcon";
import UnknownLink from "./UnknownLink";

export default function UserProfile({
  isEditing,
  setIsEditing,
  playlistToDisplay,
  setPlaylistToDisplay,
  fetchPlaylist,
  user,
  setUser,
  getOwnInfo,
}) {
  const [isLogout, setIsLogout] = useState(false);
  // console.log(playlistToDisplay)
  const { urlUsername } = useParams();
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [bioInput, setBioInput] = useState(null);


  useEffect(() => {
    fetchPlaylist(urlUsername);
  }, [urlUsername]);

  useEffect(() => {
    setBioInput(playlistToDisplay?.user.bio);
  }, [playlistToDisplay]);
  

  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
          setIsLogout(true);
        } else {
          throw new Error("Logout failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const renderLinkComponent = (link) => {
    // Check for recognized services
    switch (link.tag.name) {
      case "Facebook":
        return (
          <div key={link.id} className={style.social_link}>
            <FacebookIcon
              URL={link.URL}
              fill={playlistToDisplay?.theme?.text_secondary_color}
            />
          </div>
        );
      case "Soundcloud":
        return (
          <div key={link.id} className={style.social_link}>
            <SoundcloudIcon
              URL={link.URL}
              fill={playlistToDisplay?.theme?.text_secondary_color}
            />
          </div>
        );
      default:
        return (
          <div key={link.id} className={style.social_link}>
            <UnknownLink
              URL={link.URL}
              fill={playlistToDisplay?.theme?.text_secondary_color}
            />
          </div>
        );
    }
  };

  function handleUserEdit() {
    if (isUpdatingUser) {
      console.log("user edit ASKDFJKASJDLFKJALKSDFJ")
      fetch("/users/bio", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: bioInput }), // Sending 'bio' directly under the 'user' object
      })
      .then((response) => {
        if (response.ok) {
          // Update the user's bio locally after a successful patch request
          setPlaylistToDisplay((prevPlaylist) => ({
            ...prevPlaylist,
            user: {
              ...prevPlaylist.user,
              bio: bioInput, // Update the bio in the user object
            },
          }));
            setIsUpdatingUser(false); // Set isUpdatingUser to false after a successful update
          } else {
            throw new Error('Failed to update user bio');
          }
        })
        .catch((error) => {
          console.error('Error updating user bio:', error);
        });
    } else {
      setIsUpdatingUser(true);
    }
  }
  
  

  return (
    <>
      {playlistToDisplay && (
        <AudioPlayer
          user={user}
          playlist={playlistToDisplay}
          setPlaylistToDisplay={setPlaylistToDisplay}
          setUser={setUser}
          getOwnInfo={getOwnInfo}
          fetchPlaylist={fetchPlaylist}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}

      <div className={style.profile_panel}>
      {user?.id === playlistToDisplay?.user.id && (
        <>
          <button
            className={style.edit_profile_button}
            onClick={handleUserEdit}
            style={{
              backgroundColor: `${playlistToDisplay?.theme.primary_color}`,
              color: `${playlistToDisplay?.theme.secondary_color}`,
            }}
          >
            {!isUpdatingUser ? "EDIT" : "UPDATE"}
          </button>
          <div className={style.storage_indicator_container}>
            <div 
              className={style.progress_bar}
              style={{ 
                backgroundColor: playlistToDisplay?.theme.tertiary_color,
                border: `1px solid ${playlistToDisplay?.theme.primary_color}`
              }}
            >
              <div 
                className={style.progress_bar_fill}
                style={{ 
                  backgroundColor: playlistToDisplay?.theme.primary_color,
                  width: `${(user?.space_used / 200) * 100}%`
                }}
              ></div>
            </div>
            <span style={{ color: playlistToDisplay?.theme.text_secondary_color}}>{user?.space_used}MB / 200MB</span>
          </div>
        </>
      )}
        {urlUsername.toLowerCase() === user?.username?.toLowerCase() && (
          <>
            <Logout setUser={setUser} user={user} handleLogout={handleLogout} />
          </>
        )}
        <img
          className={style.bio_avatar}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={playlistToDisplay?.user.avatar_url || Avatar}
          alt="User Avatar"
        />
        <h2 style={{ color: playlistToDisplay?.theme?.text_primary_color }}>
          {playlistToDisplay?.user?.username}
        </h2>

        <div className={style.social_links}>
          {playlistToDisplay?.user?.links.map((link) =>
            renderLinkComponent(link)
          )}
        </div>


        {/* coming soon adding links  */}
        {/* {isUpdatingUser && (
          <button className={style.add_link_button}><img className={style.plus_icon} src={plusIcon}></img></button>
        )} */}

        <div
          className={style.bio_panel}
          style={{
            color: playlistToDisplay?.theme?.text_secondary_color,
            backgroundColor: playlistToDisplay?.theme?.tertiary_color,
          }}
        >
          {!isUpdatingUser ?
            <p>{playlistToDisplay?.user.bio}</p>
          :
          <textarea
          className={style.bio_input}
          style={{
            width: "100%",
            minHeight: "150px",
            resize: "vertical",
            overflow: "auto",
            color: playlistToDisplay?.theme?.text_secondary_color,
            backgroundColor: playlistToDisplay?.theme?.tertiary_color,
            textAlign: "center",
            boxSizing: "border-box",
          }}
          value={bioInput}
          onChange={(e) => setBioInput(e.target.value)}
        ></textarea>
          }
        </div>
      </div>

      {isLogout ? <Navigate to="/" /> : null}
    </>
  );
}
