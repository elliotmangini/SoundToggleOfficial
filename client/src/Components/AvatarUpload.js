import { useState } from 'react';
import FileUploader from './FileUploader';



export default function AvatarUpload ({ user, setUser }) {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ errors, setErrors ] = useState([]);

    function submitForm (e) {
        e.preventDefault();

        const avatar = new FormData()
        avatar.append('avatar', selectedFile)

        fetch("/avatar", {
            method: 'post',
            body: avatar,
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            } else {
                r.json().then((err) => setErrors(err.errors));
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
            <button onClick={(e) => submitForm(e)}>Upload Avatar</button>
        </form>
    )

}