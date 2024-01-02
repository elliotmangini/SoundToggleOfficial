import React from "react";
import style from "../StyleSheets/About.module.css";
import Avatar from "../Assets/placeholder-avatar.png";
import Matt from "../Assets/matt_pfp.png";
import Elliot from "../Assets/elliot_pfp.png";
import { useState, useEffect } from 'react';

import apiUrl from '../apiConfig.js';


export default function About() {
    const [latestVersion, setLatestVersion] = useState(null);

    console.log({latestVersion})

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

      {/* <section>
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
      </section> */}

      <section>
        <h1><span>Benefits</span></h1>

        <h3>Engaging A/B Comparisons</h3>
        <p>Compare audio versions with SoundToggle, allowing your audience to perceive transformative changes in real-time.</p>

        <h3>Complete Customization:</h3>
        <p>SoundToggle’s player is fully customizable. Tailor the player to match your brand without the need for coding or development expertise.</p>

        <h3>User-Friendly Integration:</h3>
        <p>Easily integrate our player into any major CMS website builder like Squarespace, Wix, and more, with no coding knowledge required. Just click export on the player and paste the code block into your site - done.</p>

        <h3>Lossless Audio Quality:</h3>
        <p>Preserve every nuance and detail in your audio creations with SoundToggle's lossless audio quality, ensuring an optimal user listening experience.</p>

        <h3>Share Anywhere:</h3>
        <p>Effortlessly share your audio creations by embedding the player in an unlimited number of websites. Alternatively, send a direct URL link to the player hosted on our platform, enabling you to share your work with anyone, anywhere, and at any time.</p>

        <h3>Universal Compatibility:</h3>
        <p>Ensure broader accessibility with SoundToggle's universal compatibility across devices and browsers, without compromising quality.</p>

        <h3>Time-Efficient Integration:</h3>
        <p>Save time with SoundToggle's quick and hassle-free integration process, allowing you to focus more on your audio creations.</p>

        <h3>Easy To Use:</h3>
        <p>SoundToggle caters to users of all expertise levels, providing an intuitive platform for both accomplished professionals and newcomers.</p>

        <h3>Modern Portfolio Presentation:</h3>
        <p>Showcase your audio portfolio in style. We love SoundCloud, but your website deserves an audio player that integrates perfectly with your site's aesthetic. Show off your mixdowns, enhancements, and transformations in a way that aligns with your unique style. Treat your audience to a smoother and more captivating presentation experience.</p>

        <h3>Immersive User Experience:</h3>
        <p>Engage and impress your audience authentically with SoundToggle, allowing them to hear, see, and feel the transformative power of your audio services or product.</p>

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
