import React, { useState, useEffect } from 'react';

import apiUrl from '../apiConfig.js';


export default function TicketDashboard() {
    const [ newsletterEmails , setNewsletterEmails ] = useState(null);

      // Function to fetch tickets when the component mounts.
    useEffect(() => {
        fetchNewsletterEmails();
    }, []);

    const fetchNewsletterEmails = async () => {
        try {
        const response = await fetch(`${apiUrl}/newsletter`);
        if (response.ok) {
            const data = await response.text();
            setNewsletterEmails(data);
        }
        } catch (error) {
        console.error('Error fetching tickets:', error);
        }
    };

    console.log(newsletterEmails);

    function copyEmails () {
        navigator.clipboard.writeText(newsletterEmails).then(() => {
            alert("Email list copied to clipboard!");
        });
    }


  return (
    <div>
        <button onClick={() => copyEmails()}>Copy Newsletter Emails</button>
    </div>
  );
}
