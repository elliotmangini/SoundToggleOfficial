import { useEffect } from "react";
import style from "../StyleSheets/Hero.module.css";

import AudioPlayer from "./AudioPlayer";

export default function Hero({ fetchPlaylist, playlistToDisplay, setPlaylistToDisplay, user }) {

  useEffect(() => {
    fetchPlaylist("heroplaylist");
  }, []);


  function handleGetYours() {
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
            Finally...
            <br />
            <br />
            <span>A before and after audio player for your website.</span>
          </h3>
          <button onClick={() => handleGetYours()} className={style.get_yours_button}>GET YOURS</button>
        </div>
        <div className={style.right_half}>
          {/* {playlistToDisplay && <AudioPlayer playlist={playlistToDisplay} />} */}
          <AudioPlayer playlist={playlistToDisplay} />
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

      <div className={style.lower_container}>
        <h4 style={{ margin: "0px", padding: "0px" }} >I WANT THIS LIKE YESTERDAY</h4>
        <h1>How do I get one for my site?</h1>
        <p>We have a free demo version available for public testing. You can access the app by clicking the button below. </p>
        <button onClick={() => handleGetYours()} className={style.get_started_button}>GET STARTED</button>
      </div>
    </>
  );
}
