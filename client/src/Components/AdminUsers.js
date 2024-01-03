import React, { useState, useEffect } from 'react';
import apiUrl from '../apiConfig.js';

export default function TicketDashboard() {
  const [ourUsers, setOurUsers] = useState(null);

  // Function to fetch tickets when the component mounts.
  useEffect(() => {
    fetchOurUsers();
  }, []);

  const fetchOurUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/newsletter`);
      if (response.ok) {
        const data = await response.json();
        setOurUsers(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  console.log(ourUsers);

  function copyEmails() {
    navigator.clipboard.writeText(ourUsers.emails).then(() => {
      alert("Email list copied to clipboard!");
    });
  }

  return (
    <div>
      <button onClick={() => copyEmails()}>Copy Newsletter Emails</button>
      
      {ourUsers && ourUsers.user_data && (
        <div>
          <h2>User List (Newest First :] )</h2>
          <ul>
            {ourUsers.user_data.map((user, index) => (
              <li key={index}>
                <a href={`https://soundtoggle.io/${user.username}`} target="_blank" rel="noopener noreferrer">
                  {user.username}
                </a>
                &nbsp; - {user.email} -
                <span style={{ marginLeft: '10px' }}>created at {new Date(user.created_at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}