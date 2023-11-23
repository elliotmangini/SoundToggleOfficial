import React, { useRef, useState } from "react";
import style from '../StyleSheets/FileUploader.module.css';

export default function FileUploader({ maxSize, onFileSelectError, onFileSelectSuccess }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize) {
        onFileSelectError({ error: "File is too large." });
      } else {
        setSelectedFile(file);
        onFileSelectSuccess(file);
      }
    } else {
      // No file selected, reset the selected file state
      setSelectedFile(null);
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div className={style.file_uploader}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileInput(e)}
      />
      <button
        className={`${style.file_selector} ${selectedFile ? style.file_selected : style.no_file}`}
        type="button" // Add this attribute to prevent form submission
        onClick={handleButtonClick}
      >
        {selectedFile ? selectedFile.name : "Select a file..."}
      </button>
    </div>
  );
}
