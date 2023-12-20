import { useEffect, useState } from 'react';
import FileUploader from './FileUploader';

import style from '../StyleSheets/AudioUpload.module.css';

import apiUrl from '../apiConfig.js';


export default function AudioUpload({ setIsPopup, setIsEditSpinner, setPlaylistToDisplay, user, setUser, identification, song }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState([]);
  
    function submitForm(e) {
      setIsEditSpinner(true);
      if (e) {
        e.preventDefault();
      }
    
      const formData = new FormData();
      formData.append(identification === "Before" ? "before" : "after", selectedFile);
    
      fetch(`${apiUrl}/songs/${song.id}/${identification.toLowerCase()}`, {
        method: "post",
        body: formData,
      })
        .then((r) => {
          if (r.ok) {
            return r.json().then((resp) => {
              setSelectedFile(null);
              setIsPopup(false);
              setPlaylistToDisplay((prevPlaylist) => ({
                ...prevPlaylist,
                songs: prevPlaylist.songs.map((prevSong) =>
                prevSong.id === resp.id ? resp : prevSong
              ),
              }));
              console.log(`Successfully uploaded ${identification} audio for song ${song.id}`);
            });
          } else {
            return r.json().then((err) => {
              setErrors(err.errors);
              console.log(errors);
            });
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle any network errors or unexpected issues here
        })
        .finally(() => {
          setIsEditSpinner(false); // Turn off spinner regardless of fetch success or failure
        });
    }

    useEffect(() => {
      if (selectedFile) {
        submitForm();
      }
    },[selectedFile]);
  
    return (
      <form>
        <FileUploader
          maxSize={104857600} // Max size 100MB
          onFileSelectSuccess={setSelectedFile}
          onFileSelectError={({ error }) => alert(error)}
        />
        <button 
          className={selectedFile ? style.upload_button : style.hidden} 
          onClick={(e) => submitForm(e)}
        >
          {`Upload ${identification}`}
          </button>
      </form>
    );
  }
  