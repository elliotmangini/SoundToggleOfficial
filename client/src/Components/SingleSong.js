import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AudioPlayer from "./AudioPlayer";

import apiUrl from '../apiConfig.js';

export default function SingleSong({ fetchSong }) {
  const { urlUsername } = useParams();
  const { songID } = useParams();

  const [ songToDisplay, setSongToDisplay ] = useState(null);

  console.log(urlUsername);
  console.log(songID);

  function fetchSong(ID) {
    console.log(
      `Fetching song endpoint: /songs/${ID}`
    );
    fetch(`${apiUrl}/songs/${ID}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Failed to fetch song.");
      }
    })
    .then((data) => {
      console.log("succesfully fetched song:");
      console.log(data);
      setSongToDisplay(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    console.log("effect is running");
    fetchSong(songID);
  },[])


  return (
    <>
        { songToDisplay ? <AudioPlayer playlist={songToDisplay} /> : null}
    </>
  );
}
