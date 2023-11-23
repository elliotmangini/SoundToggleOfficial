import { useState } from 'react';
import FileUploader from './FileUploader';
import style from '../StyleSheets/ArtworkUpload.module.css';



export default function ArtworkUpload ({ setIsPopup, user, setUser, song, selectedFile, setSelectedFile }) {
    const [ errors, setErrors ] = useState([]);

    function submitForm (e) {
        e.preventDefault();

        const artwork = new FormData()
        artwork.append('artwork', selectedFile)

        fetch(`/songs/${song.id}/artwork`, {
            method: 'post',
            body: artwork,
          }).then((r) => {
            if (r.ok) {
              r.json().then((user) => setIsPopup(false));
            } else {
              r.json().then((err) => {
                setErrors(err.errors);
                console.log(errors);
              })
            }
          });
          
    }


    return (
        <form >
            <FileUploader
            maxSize={6291456}
            onFileSelectSuccess={setSelectedFile}
            onFileSelectError={({ error }) => alert(error)}
            />
            <button className={selectedFile ? style.upload_button : style.hidden} onClick={(e) => submitForm(e)}>{selectedFile ? "Upload" : "No File Selected"}</button>
        </form>
    )

}