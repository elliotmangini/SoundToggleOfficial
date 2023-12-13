import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import style from '../StyleSheets/AddSong.module.css';

import apiUrl from '../apiConfig';

export default function SongUpload({ user, playlist, fetchPlaylist, getOwnInfo }) {
  // const { urlUsername } = useParams();
  const { urlPlaylist } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    primary_attribute: '',
    secondary_attribute: '',
  });

  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  
    if (!formData.title || !formData.primary_attribute || !formData.secondary_attribute) {
      setErrors(['Please fill out all fields']);
      return;
    }
  
    setErrors([]);
  
    const songData = new FormData();
    songData.append('title', formData.title);
    songData.append('primary_attribute', formData.primary_attribute);
    songData.append('secondary_attribute', formData.secondary_attribute);
    songData.append('playlist_id', playlist.id)
  
    fetch(`${apiUrl}/songs`, {
      method: 'POST',
      body: songData,
    })
      .then((response) => {
        if (response.ok) {
          setFormData({
            title: '',
            primary_attribute: '',
            secondary_attribute: '',
          });

          fetchPlaylist(user.username, urlPlaylist)
  
        } else {
          return response.json().then((err) => Promise.reject(err.errors));
        }
      })
      .catch((error) => {
        setErrors(Array.isArray(error) ? error.map((err) => err.toString()) : [error.toString()]);
      });
  }
  

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
    <h2 className={style.add_song_title}>Add tracks to playlist</h2>
    <form className={style.add_form} onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="title"></label>
        <input
          placeholder="Title"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          text-align="center"
        />
      </div>

      <div>
        <label htmlFor="primary_attribute"></label>
        <input
          placeholder="Primary, ex. Artist"
          type="text"
          id="primary_attribute"
          name="primary_attribute"
          value={formData.primary_attribute}
          onChange={handleChange}
          required
          text-align="center"
        />
      </div>

      <div>
        <label htmlFor="secondary_attribute"></label>
        <input
          placeholder="Secondary, ex. Genre"
          type="text"
          id="secondary_attribute"
          name="secondary_attribute"
          value={formData.secondary_attribute}
          onChange={handleChange}
          required
          text-align="center"
        />
      </div>

      <button className={style.add_track_button} type="submit">Add Track</button>
    </form>
    </>
  );
}
