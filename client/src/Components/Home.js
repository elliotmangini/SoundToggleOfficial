import React from "react";
import style from "../StyleSheets/Home.module.css";
import Avatar from "../Assets/placeholder-avatar.png";
import Matt from "../Assets/matt_pfp.png";
import Elliot from "../Assets/elliot_pfp.png";
import { useState, useEffect } from 'react';


export default function Home() {
    const [latestVersion, setLatestVersion] = useState(null);

    console.log({latestVersion})

    useEffect(() => {
      // Fetch the most recent version when the component mounts
      fetch("api/current_version")
        .then((response) => response.json())
        .then((data) => {
          setLatestVersion(data);
        })
        .catch((error) => {
          console.error("Error fetching latest version:", error);
        });
    }, []); // The empty dependency array makes this effect run once when the component mounts


    function formatTextWithLineBreaks(text) {
        if (text) {
            return text.split('\n').map((line, index) => (
              <>
                {line}
                <br />
              </>
            ));
        }
      }



  return (
    <div className={style.home_page}>
      <section>
        <h1 className={style.welcome}>Welcome to SoundToggle</h1>
        <img 
            src={Avatar}
            style={{ height: '100px', width: '100px', objectFit: 'cover', borderRadius: "100%", margin: "0"}}
        ></img>
        <p>
          SoundToggle is an audio streaming platform that solves the multiple versions problem once and for all.
          Built by two scrappy Audio Engineers, and built with Engineers, Educators, Artists, Developers, Plugin Manufacturers, and Audio Professionals in mind,
          we hope the platform can help you bring more forth from your work, and we hope you will share your thoughts and feedback with us as we go to help shape the future of the app.
        </p>
        <p style={{ fontStyle: "italic"}}>Sincerly,<br/>- Matt Ebso & Elliot Mangini</p>
      </section>

      <section className={style.version_section}>
        <h1>Latest Version Notes</h1>
        <div className={style.version_details}>
          <h3>{latestVersion?.name}</h3>
          <p>{formatTextWithLineBreaks(latestVersion?.notes)}</p>
          <h4>{latestVersion?.release}</h4>
        </div>
      </section>

      <section>
        <h2>About Us</h2>
        <div className={style.headshot_container}>
            <img src={Matt}></img>
            <img src={Elliot}></img>
        </div>
        <p>
          We are Audio Engineers who are passionate about
          delivering a seamless version-audio player. Matt Ebso is founder of
          &nbsp;<a href="https://cloverleaf.audio/" target="_blank">Cloverleaf Audio-Visual</a>&nbsp;
          based in Minneapolis, MN and Elliot is a &nbsp;<a href="https://elliotmangini.dev/" target="_blank">Developer</a>&nbsp;and Drum & Bass
          producer as &nbsp;<a href="https://www.youtube.com/watch?v=NNnNKWoEDDk&t=1622s" target="_blank">Big Sister</a>.
        </p>
      </section>

      <section>
        <h2>Thank You!</h2>
        <p>
          We sincerely thank you for choosing SoundToggle. Your support and
          feedback will guide the future of this platform. Enjoy the music!
        </p>
      </section>
    </div>
  );
}
