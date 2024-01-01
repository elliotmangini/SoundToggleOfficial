import React, { useState } from 'react';
import style from '../StyleSheets/ContactUs.module.css';
import ChatIcon from '../Assets/chat-icon.png';

import apiUrl from '../apiConfig';

export default function ContactUs({ user }) {
  const [isChat, setIsChat] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  function handleSubmitMessage(e) {
    e.preventDefault();

    if (!selectedTag) {
      alert('Please select a type for this message (find buttons above the submit buttons).');
      return; // Prevent the fetch request if no tag is selected
    }

    // Create a FormData object with subject and body values
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('body', body);
    formData.append('tag_name', selectedTag);

    // Send a POST request to the endpoint (modify the URL accordingly)
    fetch(`${apiUrl}/tickets`, {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        alert('Thank you! We will get back to you ASAP if a response is in order :)');
        setIsChat(false);
      } else {
      }
    });
  }

  return (
    <>
      {isChat && (
        <div className={style.fade_background}>
          <div className={style.chat_panel}>
            <button onClick={() => setIsChat(false)} className={style.back_button}>X</button>
            <h1>Get in touch!</h1>
            <p>Let us know how we're doing and get some pro features pro bono!</p>
            <form onSubmit={(e) => handleSubmitMessage(e)}>
              <div>
                <input
                  className={style.subject_input}
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter your subject"
                />
              </div>
              <div className={style.body_container}>
                <textarea
                  className={style.body_input}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter your message"
                />
              </div>
                {/* Tag selection buttons */}
                <div className={style.tag_button_container}>
                  {["Feedback", "Bug Report", "Feature Request", "Support", "Other"].map(function (option) {
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
                <button className={style.chat_submit_button}type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      <div className={style.chat_button} onClick={() => setIsChat(!isChat)}>
        <button style={{ backgroundColor: 'transparent' }}>
          <img src={ChatIcon} className={style.chat_icon} alt="Chat" />
        </button>
        <div className={style.chat_icon_nametag}>Chat With Us!</div>
      </div>
    </>
  );
}
