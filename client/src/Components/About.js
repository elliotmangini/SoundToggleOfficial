import React from "react";
import style from "../StyleSheets/About.module.css";
import Avatar from "../Assets/placeholder-avatar.png";
import Matt from "../Assets/matt_pfp.png";
import Elliot from "../Assets/elliot_pfp.png";
import { useState, useEffect } from 'react';

import apiUrl from '../apiConfig.js';


export default function About() {
    const [latestVersion, setLatestVersion] = useState(null);

    useEffect(() => {
      // Fetch the most recent version when the component mounts
      fetch(`${apiUrl}/current_version`)
        .then((response) => response.json())
        .then((data) => {
          setLatestVersion(data);
        })
        .catch((error) => {
          console.error("Error fetching latest version:", error);
        });
    }, []); // The empty dependency array makes this effect run once when the component mounts



  return (
    <div className={style.about_page}>
      <section>
        <h1 className={style.welcome}>Welcome to <span>SoundToggle</span>!</h1>
        <img 
            src={Avatar}
            style={{ height: '100px', width: '100px', objectFit: 'cover', borderRadius: "100%", margin: "0"}}
        ></img>
        <p>
        Welcome to <span>SoundToggle</span>, the revolutionary before-and-after (A/B) website audio player meticulously designed for professionals in the audio industry. Crafted with precision by a small team of seasoned audio engineers, SoundToggle isn’t just a widget – it's a living showcase of the profound transformative power of sound. Whether you're an industry veteran or a budding newcomer, our innovative audio player empowers you to seamlessly present your work, providing your audience with an opportunity to authentically hear, see, and feel the extraordinary impact of your audio services or product. At SoundToggle, we firmly believe in letting your work speak for itself, and our player serves as the gateway to an immersive experience that brings your audio portfolio to life. Join us and redefine the way you share your sonic creations with the world.
        </p>
        {/* <p style={{ fontStyle: "italic"}}>Sincerly,<br/>- Matt Ebso & Elliot Mangini</p> */}
      </section>

      {/* <section className={style.version_section}>
        <h1>Latest Version Notes</h1>
        <div className={style.version_details}>
          <h3>{latestVersion?.name}</h3>
          <p>{formatTextWithLineBreaks(latestVersion?.notes)}</p>
          <h4>{latestVersion?.release}</h4>
        </div>
      </section> */}

      <section>
        <h2>About Us</h2>
        <div className={style.headshot_container}>
            <img src={Matt}></img>
            <img src={Elliot}></img>
        </div>
        <p>
          We are Audio Engineers passionate about
          delivering the seamless version-audio player we wished existed when we started our careers. <span>Matt Ebso</span> is founder of
          &nbsp;<a href="https://cloverleaf.audio/" target="_blank">Cloverleaf Audio-Visual</a>&nbsp;
          based in Minneapolis, MN and <span>Elliot Mangini</span> is a &nbsp;<a href="https://elliotmangini.dev/" target="_blank">Developer</a>&nbsp;and Drum & Bass
          producer as &nbsp;<a href="https://www.youtube.com/watch?v=NNnNKWoEDDk&t=1622s" target="_blank">Big Sister</a>.
        </p>
      </section>

      <section>
        <p>
          <em>
            "SoundToggle is an audio streaming platform that solves the multiple versions problem once and for all.
            Built by two scrappy Audio Engineers, and built with Engineers, Educators, Artists, Developers, Plugin Manufacturers, and Audio Professionals in mind,
            we hope the platform can help you bring more forth from your work, and we hope you will share your thoughts and feedback with us as we go to help shape the future of the app."
          </em>
        </p>
        <p style={{ fontStyle: "italic"}}>Sincerly,<br/>- Matt Ebso & Elliot Mangini</p>
      </section>

      <section>
        <h1><span>Thank You!</span></h1>
        <p>
          We sincerely thank you for choosing SoundToggle. Your support and
          feedback will guide the future of this platform. Enjoy the music!
        </p>
      </section>
    </div>
  );
}
