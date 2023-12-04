import { useState } from 'react';
import FileUploader from './FileUploader';



export default function AudioUpload({ user, setUser, identification, song }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState([]);
  
    function submitForm(e) {
      e.preventDefault();
  
      if (!selectedFile) {
        // Handle the case when no file is selected
        return;
      }
  
      const formData = new FormData();
      formData.append(identification === "Before" ? "before" : "after", selectedFile);
  
      fetch(`api/songs/${song.id}/${identification.toLowerCase()}`, {
        method: "post",
        body: formData,
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((updatedSong) => {
              // You may want to update the song in your state here
              console.log(`Successfully uploaded ${identification} audio for song ${song.id}`);
            });
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle any network errors or unexpected issues here
        });
    }
  
    return (
      <form>
        <FileUploader
          maxSize={104857600} // Max size 100MB
          onFileSelectSuccess={setSelectedFile}
          onFileSelectError={({ error }) => alert(error)}
        />
        <button onClick={(e) => submitForm(e)}>{`Upload ${identification}`}</button>
      </form>
    );
  }
  