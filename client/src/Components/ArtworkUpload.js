import { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import style from '../StyleSheets/ArtworkUpload.module.css';

import apiUrl from '../apiConfig';



export default function ArtworkUpload ({ setIsEditSpinner, playlist, setPlaylistToDisplay, setIsPopup, user, setUser, song, selectedFile, setSelectedFile }) {
    const [ errors, setErrors ] = useState([]);

    function submitForm(e) {
      setIsEditSpinner(true);
      if (e) {
        e.preventDefault();
      }
    
      const artwork = new FormData();
      artwork.append('artwork', selectedFile);
    
      fetch(`${apiUrl}/songs/${song.id}/artwork`, {
        method: 'post',
        body: artwork,
      })
        .then((r) => {
          if (r.ok) {
            return r.json().then((resp) => {
              setSelectedFile(null);
              setIsPopup(false);
              console.log(resp);
              // TODO: set the front end song artwork to this!
              setPlaylistToDisplay((prevPlaylist) => ({
                ...prevPlaylist,
                songs: prevPlaylist.songs.map((prevSong) =>
                  prevSong.id === song.id ? { ...prevSong, artwork_url: resp.artwork_url } : prevSong
                ),
              }));
            });
          } else {
            return r.json().then((err) => {
              setErrors(err.errors);
              console.log(errors);
            });
          }
        })
        .catch((error) => {
          console.error('Error occurred:', error);
          // Handle other errors if needed
        })
        .finally(() => {
          setIsEditSpinner(false); // Set spinner to false regardless of fetch success or failure
        });
    }
    

    useEffect(() => {
      if (selectedFile) {
        submitForm();
      }
    },[selectedFile]);


    return (
        <form >
            <FileUploader
            maxSize={6291456}
            onFileSelectSuccess={setSelectedFile}
            onFileSelectError={({ error }) => alert(error)}
            />
            <button 
              className={selectedFile ? style.upload_button : style.hidden} 
              onClick={(e) => submitForm(e)}
            >
              {selectedFile ? "Upload" : "No File Selected"}
            </button>
        </form>
    )

}