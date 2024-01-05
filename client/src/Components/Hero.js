import { useEffect } from "react";
import style from "../StyleSheets/Hero.module.css";

import AudioPlayer from "./AudioPlayer";

export default function Hero({ fetchPlaylist, playlistToDisplay, user }) {

  useEffect(() => {
    fetchPlaylist("heroplaylist");
  }, []);


  function handleGetYoursButton() {
    if (user) {
      // Redirect signed-in user to their profile page
      window.location.href = `/${user.username}`;
    } else {
      // Redirect non-signed-in user to the signup page
      window.location.href = "/signup";
    }
  }


  return (
    <>
      <div className={style.top_container}>
        <div className={style.left_half}>
          <h3 className={style.left_text}>
            <div className={style.finally}>Finally...</div>
            <div className={style.cta_mask}>
              <div className={style.cta}>
                A <div className={style.before}>before</div> and <div className={style.after}>after</div> audio player <div className={style.for}>for</div> <div className={style.your}>your</div> <div className={style.website}>website</div>.
              </div>
            </div>
          </h3>
          <button onClick={() => handleGetYoursButton()} className={style.get_yours_button}>GET YOURS</button>
        </div>
        <div className={style.right_half}>
          <div className={style.inset_player}>
            <AudioPlayer playlist={playlistToDisplay} />
          </div>
        </div>
      </div>

      <div className={style.middle_container}>
        <div className={style.middle_content}
        style={{ margin: "0px", padding: "0px" }}
        >
          <div className={style.additional_blurb}>
            <h2>Who is this for?</h2>
            <p>This audio player is specially designed for audio professionals to show off their portfolio in the easiest way possible: with a before and after toggle switch to demonstrate how the sound was transformed.</p>
          </div>
          <div className={style.additional_blurb}>
            <h2>How does setup work?</h2>
            <p>Simply upload your time-aligned "before" and "after" samples, customize the player's style, then embed the HTML code we provide in any website to start wowing and winning potential clients.</p>
          </div>
          <div className={style.additional_blurb}>
            <h2>How much does it cost?</h2>
            <p>For now, it costs absolutely nothing. We want to share the player with audio professionals who can give us feedback about their experience and their clients' experience before we charge for it.</p>
          </div>
        </div>
      </div>

      <div className={style.panel_style}>
        <section>
          <h1>Benefits</h1>
          <div>
            <h3>Engaging A/B Comparisons</h3>
            <p>Compare audio versions with SoundToggle, allowing your audience to perceive transformative changes in real-time.</p>
          </div>

          <div>
            <h3>Complete Customization:</h3>
            <p>SoundToggle’s player is fully customizable. Tailor the player to match your brand without the need for coding or development expertise.</p>
          </div>

          <div>
            <h3>User-Friendly Integration:</h3>
            <p>Easily integrate our player into any major CMS website builder like Squarespace, Wix, and more, with no coding knowledge required. Just click export on the player and paste the code block into your site - done.</p>
          </div>

          <div>
            <h3>Lossless Audio Quality:</h3>
            <p>Preserve every nuance and detail in your audio creations with SoundToggle's lossless audio quality, ensuring an optimal user listening experience.</p>
          </div>

          <div>
            <h3>Share Anywhere:</h3>
            <p>Effortlessly share your audio creations by embedding the player in an unlimited number of websites. Alternatively, send a direct URL link to the player hosted on our platform, enabling you to share your work with anyone, anywhere, and at any time.</p>
          </div>

          <div>
            <h3>Universal Compatibility:</h3>
            <p>Ensure broader accessibility with SoundToggle's universal compatibility across devices and browsers, without compromising quality.</p>
          </div>

          <div>
            <h3>Time-Efficient Integration:</h3>
            <p>Save time with SoundToggle's quick and hassle-free integration process, allowing you to focus more on your audio creations.</p>
          </div>

          <div>
            <h3>Easy To Use:</h3>
            <p>SoundToggle caters to users of all expertise levels, providing an intuitive platform for both accomplished professionals and newcomers.</p>
          </div>

          <div>
            <h3>Modern Portfolio Presentation:</h3>
            <p>Showcase your audio portfolio in style. We love SoundCloud, but your website deserves an audio player that integrates perfectly with your site's aesthetic. Show off your mixdowns, enhancements, and transformations in a way that aligns with your unique style. Treat your audience to a smoother and more captivating presentation experience.</p>
          </div>

          <div>
            <h3>Immersive User Experience:</h3>
            <p>Engage and impress your audience authentically with SoundToggle, allowing them to hear, see, and feel the transformative power of your audio services or product.</p>
          </div>
        </section>
      </div>

      <div className={style.lower_container}>
        <h4 style={{ margin: "0px", padding: "0px" }} ><em>I WANT THIS LIKE YESTERDAY!</em></h4>
        <h1>How do I get one for my site?</h1>
        <p>We have a free demo version available for public testing. You can access the app by clicking the button below. </p>
        <button onClick={() => handleGetYoursButton()} className={style.get_started_button}>GET STARTED</button>
      </div>
    </>
  );
}
