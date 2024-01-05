import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import siteLogo from '../Assets/soundtoggle-logo.svg';

import ThemeEditor from "./ThemeEditor.js";
import AudioUpload from "./AudioUpload.js";
import ArtworkUpload from "./ArtworkUpload.js";
import AddSong from "./AddSong.js";
import FullscreenSpinner from "./FullscreenSpinner.js";
import InvisibleSpinner from "./InvisibleSpinner.js";

import style from "../StyleSheets/AudioPlayer.module.css";

import defaultArtwork from "../Assets/vinyl_placeholder.png";
import playButton from "../Assets/play.svg";
import uploadIcon from "../Assets/upload_icon.png";
import pencilIcon from "../Assets/pencil_icon.png";
import saveIcon from "../Assets/save_icon.png";

import PlayButtonIcon from './PlayButtonIcon.js';
import PauseButtonIcon from './PauseButtonIcon.js';
import SkipButtonIcon from './SkipButtonIcon.js';
import ShareButtonIcon from './ShareButtonIcon.js';
import TrashButtonIcon from "./TrashButtonIcon.js";
import SoundToggleLogoIcon from "./SoundToggleLogoIcon.js";

import apiUrl from "../apiConfig.js";



export default function AudioPlayer({ user, playlist, setPlaylistToDisplay, setUser, fetchPlaylist, isEditing, setIsEditing }) {
  // console.log(playlist);

  const { urlUsername } = useParams();
  const { urlPlaylist } = useParams();

  const [isEditSpinner, setIsEditSpinner] = useState(false);
  const [visibleSpinner, setVisibleSpinner] = useState(null); // this never needs to be set manually

  useEffect(() => {
    console.log("effect is running");
    if (isEditSpinner) {
      const invisibleSpinnerDuration = 500; // Half a second
      const fullScreenSpinnerDuration = 1000; // One second

      // Show InvisibleSpinner after half a second
      const invisibleSpinnerTimeout = setTimeout(() => {
        setVisibleSpinner(<InvisibleSpinner />);
      }, invisibleSpinnerDuration);

      // Show FullscreenSpinner after one second
      const fullScreenSpinnerTimeout = setTimeout(() => {
        if (visibleSpinner === null) {
          setVisibleSpinner(<FullscreenSpinner />);
        }
      }, fullScreenSpinnerDuration);

      return () => {
        clearTimeout(invisibleSpinnerTimeout);
        clearTimeout(fullScreenSpinnerTimeout);
      };
    } else {
      setVisibleSpinner(null);
    }
  }, [isEditSpinner]);

  const [isEditPencil, setIsEditPencil] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [primaryAttrInput, setPrimaryAttrInput] = useState("");
  const [secondaryAttrInput, setSecondaryAttrInput] = useState("");

  const [isPopup, setIsPopup] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  const [currentSongId, setCurrentSongId] = useState(null);
  const [audioElements, setAudioElements] = useState({});
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [previewedTheme, setPreviewedTheme] = useState({
    primary_color: playlist?.theme?.primary_color,
    secondary_color: playlist?.theme?.secondary_color,
    tertiary_color: playlist?.theme?.tertiary_color,
    panel_style: playlist?.theme?.panel_style,
    glow: playlist?.theme?.glow,
    background_color: playlist?.theme?.background_color,
    untoggled_name: playlist?.theme?.untoggled_name,
    toggled_name: playlist?.theme?.toggled_name,
    text_primary_color: playlist?.theme?.text_primary_color,
    text_secondary_color: playlist?.theme?.text_secondary_color,
    display_user: playlist?.theme?.display_user,
    display_blurb: playlist?.theme?.display_blurb,
    name: playlist?.theme?.name,
    toggle_text_color: playlist?.theme?.toggle_text_color,
    toggle_highlight_color: playlist?.theme?.toggle_highlight_color,
    primary_attribute_name: playlist?.theme?.primary_attribute_name,
    secondary_attribute_name: playlist?.theme?.secondary_attribute_name,
  });

  // Trigger fetch of playlist only in the instance we are viewing another user's page
  useEffect(() => {
    console.log("effect is running");
    if (!playlist && urlUsername && urlPlaylist) {
      console.log(playlist);
      console.log(urlPlaylist);
      console.log(urlUsername);
      fetchPlaylist(urlUsername, urlPlaylist);
    }
  }, [playlist, urlUsername, urlPlaylist, fetchPlaylist]);

  useEffect(() => {
    console.log("effect is running");
    if (!isEditing) {
      setIsEditPencil(false);
    }
  }, [isEditing]);


  useEffect(() => {
    console.log("effect is running");
    // I think this is like "automatically update HTML audio elements when our playlist updates?"
    if (playlist && Object.keys(playlist).length > 0) {

      // If there's no songs in the playlist, the only thing to do is Edit, so we force it true.
      if (playlist.songs?.length === 0 && playlist.user?.username === user?.username) {
        setIsEditing(true);
      }
  
      const initialSongs = playlist.songs || [];
      const currentSongIds = initialSongs.map((song) => song.id);
      
      if (
        initialSongs.length !== Object.keys(audioElements).length ||
        !currentSongIds.every((songId) => audioElements[songId])
      ) {
        const elements = {};
        initialSongs.forEach((song) => {
          if (!audioElements[song.id]) {

            const artworkImage = new Image();
            artworkImage.src = song.artwork_url || defaultArtwork;

            elements[song.id] = {
              before: new Audio(song.before.audio_url),
              after: new Audio(song.after.audio_url),
              artwork: artworkImage,
            };
          }
        });
        setAudioElements((prevElements) => ({ ...prevElements, ...elements }));
      }
      
      setCurrentSongId(initialSongs.length > 0 ? initialSongs[0].id : null);
    }
    // I removed AudioElements from this dependency array and that may break something, but atm it seems to have fixed an infinite loop.
  }, [playlist, user]);
  

  useEffect(() => {
    console.log("effect is running");
    // console.log("one of these is changing rapidly");
    // console.log({currentSongId});
    // console.log({audioElements});
    // console.log({playlist});
    if (currentSongId && audioElements[currentSongId]) {
      const initialAudio = audioElements[currentSongId].before;
      setCurrentAudio(initialAudio);

      const audio = initialAudio;
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audio.addEventListener("ended", () => {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      });

      return () => {
        audio.removeEventListener("loadedmetadata", () => {});
        audio.removeEventListener("timeupdate", () => {});
        audio.removeEventListener("ended", () => {});
      };
    }
  }, [currentSongId, audioElements, playlist]);

  const togglePlayback = () => {
    if (!isEditing) {
      if (isPlaying) currentAudio.pause();
      else currentAudio.play();
      setIsPlaying(!isPlaying);
    }
  };



  // stop playing audio whenever we switch to a different URL
  useEffect(() => {
    // This code will run when the component mounts
    // Return a cleanup function
    return () => {
      console.log("cleanup called!")
      // This code will run when the component unmounts (and at other times)
      currentAudio?.pause();

    };
  }, [currentAudio]);






  const toggleSource = () => {
    if (currentAudio && !isEditing) {
      const currentSource =
        currentAudio === audioElements[currentSongId].before ? "before" : "after";

      const newSource = currentSource === "before" ? "after" : "before";

      const newAudio = audioElements[currentSongId][newSource];

      const wasPlaying = isPlaying;
      const currentTimeBeforeSwitch = currentAudio.currentTime;

      currentAudio.pause();

      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });

      newAudio.addEventListener("timeupdate", () => {
        setCurrentTime(newAudio.currentTime);
      });

      newAudio.addEventListener("ended", () => {
        newAudio.pause();
        newAudio.currentTime = 0;
        setIsPlaying(false);
      });

      setCurrentAudio(newAudio);

      if (wasPlaying) {
        newAudio.play();
      }

      newAudio.currentTime = currentTimeBeforeSwitch;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSongChange = (song) => {
    if (audioElements[song.id] && (currentSongId !== song.id) && !isEditing) {
      // Clear the background color for all previously highlighted songs
      const highlightedSongs = document.querySelectorAll(`.${style.song}[style*="background-color"]`);
      highlightedSongs.forEach((highlightedSong) => {
        highlightedSong.style.backgroundColor = "transparent";
      });
  
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      }
  
      setCurrentSongId(song.id);
      setCurrentAudio(audioElements[song.id].before);
      audioElements[song.id].before.currentTime = 0;
  
      let durationUpdated = false;
  
      audioElements[song.id].before.addEventListener("canplaythrough", () => {
        if (!durationUpdated) {
          setDuration(audioElements[song.id].before.duration);
          durationUpdated = true;
        }
      });
  
      audioElements[song.id].before.play();
      setIsPlaying(true);
    }
  };
  

  const getCurrentSongIndex = () => {
    return playlist.songs.findIndex((song) => song.id === currentSongId);
  };

  const getPreviousSong = () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex > 0) {
      return playlist.songs[currentIndex - 1];
    }
    return playlist.songs[playlist.songs.length - 1];
  };

  const getNextSong = () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex < playlist.songs.length - 1) {
      return playlist.songs[currentIndex + 1];
    }
    return playlist.songs[0];
  };

  const convertToKebabCase = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCopySingleToClipboard = (songID) => {
    const songLink = `https://soundtoggle.io/${urlUsername}/s/${songID}`;
    navigator.clipboard.writeText(songLink).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const deleteSong = (songId) => {
    const confirmation = window.confirm("Are you sure you want to delete this song?");
  
    if (confirmation) {
      setIsEditSpinner(true);
      fetch(`${apiUrl}/songs/${songId}`, {
        method: 'DELETE',
        headers: {},
      })
        .then((response) => {
          if (response.status === 204) {
            alert("Song deleted successfully!");
            // After deleting the song, update the playlist state to exclude the deleted song.
            setPlaylistToDisplay((prevPlaylist) => {
              const updatedSongs = prevPlaylist.songs.filter((song) => song.id !== songId);
              return { ...prevPlaylist, songs: updatedSongs };
            });
  
            setIsEditSpinner(false);
          } else {
            alert("Failed to delete song. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error deleting song:", error);
          alert("Failed to delete song. Please try again.");
          setIsEditSpinner(false);
        });
    }
  };
  

  const handleExport = () => {
    const iframeCode = `<iframe src="https://soundtoggle.io/${playlist.user.username}/${convertToKebabCase(playlist.name)}/export" width="100%" height="800px" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(iframeCode).then(() => {
      alert("Iframe code block copied to clipboard! At the moment, you may need to do a wee bit of tweaking to the height and width, soon we will set these up to be exactly right for you! :)");
    });
  };

  const handleIsEditing = () => {
    if (currentAudio) {
      currentAudio.pause();
    }
    setIsPlaying(false);
    if (!isEditing) {
      setIsEditing(true);
    } else {
      if (playlist?.songs.length > 0) {
      fetchPlaylist(user.username, urlPlaylist);
      setIsEditing(false);
      setIsEditPencil(false);
      } else {
        alert("Add some tracks before publishing!");
      }
    }
  };

  const handleUpdateSongInfo = (song) => {
    if (song.id && (titleInput !== song.title || primaryAttrInput !== song.primary_attribute || secondaryAttrInput !== song.secondary_attribute)) {
      setIsEditSpinner(true);
      // Create an object containing the data to update
      const updatedData = {
        title: titleInput,
        primary_attribute: primaryAttrInput,
        secondary_attribute: secondaryAttrInput,
      };
  
      // Make a PATCH or PUT request to update the song
      fetch(`${apiUrl}/songs/${song.id}`, {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          // Additional headers if necessary
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.status === 200) {
            // alert("Song information updated successfully!");
            // After updating the song, you may want to refetch the updated playlist.
            // Call fetchPlaylist or other appropriate function.
            setIsEditPencil(false);
            fetchPlaylist(urlUsername, urlPlaylist);
            setIsEditSpinner(false);
          } else {
            alert("Failed to update song information. Please try again.");
            setIsEditSpinner(false);
          }
        })
        .catch((error) => {
          console.error("Error updating song information:", error);
          alert("Failed to update song information. Please try again.");
          setIsEditSpinner(false);
        });
    } else {
      setIsEditPencil(false);
    }
  };
  

  return (
    <>
            {isEditing && user?.id !== undefined && user?.id === playlist?.user?.id &&(
              <>
                <AddSong user={user} playlist={playlist} fetchPlaylist={fetchPlaylist} />
              </>
            )}
      <div 
        className={style.player_panel}
        style={{ 
          backgroundColor: `${playlist?.theme?.background_color}`,
          borderRadius: `${playlist?.theme?.panel_style === 'rounded' ? '1rem' : '0px'}`
      }}
      >
      <div className={style.upper_player}>
        {user?.id !== undefined && user?.id === playlist?.user?.id && (
          <>
            <button
              className={`${style.upper_button} ${style.export_button}`}
              style={{ backgroundColor: `${playlist?.theme.primary_color}`, color: `${playlist?.theme.secondary_color}`}}
              onClick={handleExport}
            >Export
            </button>
            <button
              className={`${style.upper_button} ${!isEditing ? style.edit_button : style.publish_button}`}
              onClick={() => handleIsEditing()}
              style={{ backgroundColor: `${playlist?.theme.primary_color}`, color: `${playlist?.theme.secondary_color}`}}
            >{!isEditing ? "EDIT" : "PUBLISH"}
            </button>
          </>
        )}
          <img
            className={`${style.main_artwork} ${playlist?.theme?.glow && isPlaying && currentAudio === audioElements[currentSongId].after
              ? style.glowing
              : ""}`}
            src={audioElements[currentSongId]?.artwork.src || defaultArtwork}
            alt="Artwork"
          />
      </div>

        {/* USER CONTROLS UPPER MIDDLE */}
        <div className={`${style.user_controls} ${style.opacity_one}`}>
          <div className={style.playback_buttons}>
            <button
              className={`${style.icon_container} ${style.previous}`}
              style={{ backgroundColor: `${playlist?.theme?.primary_color}` }}
              onClick={() => handleSongChange(getPreviousSong())}
            >
              <SkipButtonIcon
              fill={playlist?.theme?.secondary_color}
              />
            </button>
            <button
              className={`${style.icon_container} ${style.play_container}`}
              style={{ backgroundColor: `${playlist?.theme?.primary_color}` }}
              onClick={togglePlayback}
            >
              {!isPlaying ?
                <PlayButtonIcon fill={playlist?.theme?.secondary_color}/>
                :
                <PauseButtonIcon fill={playlist?.theme?.secondary_color}/>
                }
            </button>
            <button
              className={style.icon_container}
              style={{ backgroundColor: `${playlist?.theme?.primary_color}` }}
              onClick={() => handleSongChange(getNextSong())}
            >
              <SkipButtonIcon fill={playlist?.theme?.secondary_color} />
            </button>
          </div>
          <div className={style.timeline_container}>
            <input
              className={style.timeline}
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              // style={{ background: playlist?.theme.primary_color}}
              onChange={(e) => {
                currentAudio.currentTime = e.target.value;
              }}
            />
          </div>
          <div className={style.duration}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div
            className={style.toggle_module}
            style={{
              color: `${playlist?.theme?.text_primary_color}`,
              backgroundColor: `${playlist?.theme?.primary_color}`
            }}
          >
            <p
              style={{ color: `${playlist?.theme?.toggle_text_color}`, fontWeight: 'bold'}}
            >{playlist?.theme?.untoggled_name}</p>
            <label className={style.toggle_switch}>
              <input
                onChange={toggleSource}
                type="checkbox"
                checked={currentAudio === audioElements[currentSongId]?.after}
              />
              <span
                className={style.slider}
                style={{
                  backgroundColor: `${currentAudio === audioElements[currentSongId]?.after ? playlist?.theme?.toggle_highlight_color : playlist?.theme?.secondary_color }`
                }}
              ></span>
            </label>
            <p
              style={{ color: `${playlist?.theme?.toggle_text_color}`, fontWeight: 'bold'}}
            >{playlist?.theme?.toggled_name}</p>
          </div>
        </div>

        {isEditing && (
          <>
            <ThemeEditor setIsEditSpinner={setIsEditSpinner} setPlaylistToDisplay={setPlaylistToDisplay} user={user} playlist={playlist} previewedTheme={previewedTheme} setPreviewedTheme={setPreviewedTheme} />
          </>
        )}




        
        <div className={style.playlist_div}>
          <ul className={style.playlist}>
            {playlist && playlist?.songs?.length > 0 ? (
              playlist.songs.map((song) => (
                <div
                  key={song.id}
                  className={`${style.song} ${isEditing ? style.editing_panel_bkgd : null}`}
                  style={{
                    backgroundColor: `${(currentSongId === song.id) || isEditing ? playlist?.theme?.tertiary_color : playlist.theme.background_color}`,
                    display: `${(!song?.before.audio_url || !song?.after.audio_url) && (user?.id !== playlist?.user.id) ? 'none' : null}` // keep songs without audio files from rendering unless the user owns the playlist owner and is on their own page
                  }}
                >
                  <li 
                    className={style.playlist_item}
                    onClick={() => handleSongChange(song)}
                    style={{
                      // cursor: "pointer",
                      color: `${playlist?.theme.primary_text_color}`,
                    }}
                  >
                  
                  {isEditing?
                  <img
                    className={isEditing ? (isEditPencil === song.id ? style.playlist_save : style.playlist_pencil) : style.playlist_song_play}
                    onClick={() => {
                      if (isEditing) {
                        setIsEditPencil(song.id);
                        setPrimaryAttrInput(song.primary_attribute);
                        setSecondaryAttrInput(song.secondary_attribute);
                        setTitleInput(song.title);
                      }
                      if (isEditPencil === song.id) {
                        if ((song.title !== titleInput) || (song.attribute_one !== primaryAttrInput) || (song.attribute_two !== secondaryAttrInput)) {
                          handleUpdateSongInfo(song);
                        } else{
                          setIsEditPencil("");
                        }
                      }
                    }}                    
                    src={isEditing ? (isEditPencil === song.id ? saveIcon : pencilIcon) : playButton}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                  :
                  <PlayButtonIcon size={"small"} fill={playlist?.theme.primary_color} />
                  }

                  {/* TITLE AND TITLE INPUT FIELD */}
                  <div className={style.song_info}>
                    { isEditPencil === song.id ? (
                      <>
                      <input 
                        className={`${style.attr_edit_input}`}
                        onChange={(e) => setTitleInput(e.target.value)}
                        value={titleInput}
                        placeholder="Title"
                      >
                      </input>
                      <br/>
                      <input
                        className={`${style.attr_edit_input}`}
                        onChange={(e) => setPrimaryAttrInput(e.target.value)}
                        value={primaryAttrInput}
                        placeholder="Attribute One"
                      >
                      </input>
                    </>
                    
                    )
                    :
                    <>
                      <div className={style.title} style={{ color: playlist?.theme.text_primary_color }} >
                        {song.title}
                      </div>
                      <div className={style.artist} style={{ color: playlist?.theme.text_secondary_color }} >
                        {song.primary_attribute}
                      </div>
                    </>
                    }
                  </div>
                    {isEditPencil === song.id ? (
                      <input 
                        className={`${style.attr_edit_input} ${style.secondary_attr_input}`}
                        onChange={(e) => setSecondaryAttrInput(e.target.value)}
                        value={secondaryAttrInput}
                        placeholder="Attribute Two"
                      >
                      </input>
                    ) :
                    <span  style={{ color: playlist?.theme.text_secondary_color }} >{song.secondary_attribute}</span> }

                    {user?.id === playlist?.user.id && ( // Check if user is on their own page
                      <>
                        <div className={style.share_and_status}>
                          {song.before.audio_url && song.after.audio_url ? ( // Check if audio URLs exist
                            // TODO: check for potential audio duration mismatch
                            <div className={style.green_bubble}>
                              <div className={style.check}></div>
                            </div>
                          ) : (
                            <div className={style.red_bubble}>
                              <div className={style.x}></div>
                            </div>
                          )}
                          {!isEditing && (
                          <button className={style.share_button} onClick={() => handleCopySingleToClipboard(song.id)}>
                            <ShareButtonIcon />
                          </button>
                          )}
                          {user?.username === playlist.user.username && isEditing && (
                            <button className={style.delete_button} onClick={() => deleteSong(song.id)}>
                              <TrashButtonIcon/>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </li>
                  
                  {user?.username === playlist.user.username && isEditing && (
                    <div className={style.song_edit_panel}
                    // style={{ backgroundColor: `${playlist?.theme.background_color}` }}
                    style={{ background: `linear-gradient(to bottom, ${previewedTheme.background_color}, ${previewedTheme.tertiary_color})` }}
                    >
                      <div className={style.upload_statuses}>

                        {/* ARTWORK EDIT BUTTON */}
                        <button 
                          onClick={() => {
                            setIsPopup([song.id, "Artwork"])
                          }}
                          className={style.artwork_upload_trigger}
                        >
                          <img
                            className={style.art_thumbnail}
                            src={song.artwork_url || defaultArtwork}
                          ></img>
                        </button>

                        {/* BEFORE EDIT BUTTON */}
                        <button
                          onClick={() => setIsPopup([song.id, "Slot One"])}
                          className={`${style.status_indicator} ${
                            song.before.audio_filename
                              ? style.file_found
                              : style.file_missing
                          }`}
                        >
                          {song.before.audio_filename
                            ? 
                              <>
                                {song.before.audio_filename}
                              </>
                            : ""}
                        </button>
                        
                        {/* AFTER EDIT BUTTON */}
                        <button
                          onClick={() => setIsPopup([song.id, "Slot Two"])}
                          className={`${style.status_indicator} ${
                            song.after.audio_filename
                              ? style.file_found
                              : style.file_missing
                          }`}
                        >
                          {song.after.audio_filename
                            ?
                            <>
                              {song.after.audio_filename}
                            </>
                            : ""}
                        </button>

                      </div>


                      {/* UPLOAD POPUPS */}
                      { isPopup[0] === song.id && (
                      <div className={style.popup_fullscreen}>
                        <div 
                          className={style.popup_panel}
                        >
                          <button 
                            className={style.exit_popup_button}
                            onClick={() => setIsPopup([])}
                          ></button>


                          { isPopup[1] === "Artwork" && (
                            <>
                        <div className={style.uploader_single}>
                          <img
                            className={style.upload_thumbnail}
                            src={(selectedFile ? uploadIcon : null) || song.artwork_url || defaultArtwork}
                          ></img>
                          <ArtworkUpload setIsEditSpinner={setIsEditSpinner} playlist={playlist} setPlaylistToDisplay={setPlaylistToDisplay} setIsPopup={setIsPopup} selectedFile={selectedFile} setSelectedFile={setSelectedFile} setUser={setUser} song={song} />
                        </div>
                            </>
                          )}


                          { isPopup[1] === "Slot One" && (
                            <>
                              <div className={style.uploader_single}>
                                <AudioUpload
                                  setIsEditSpinner={setIsEditSpinner}
                                  setPlaylistToDisplay={setPlaylistToDisplay}
                                  setUser={setUser}
                                  setIsPopup={setIsPopup}
                                  song={song}
                                  identification="Before"
                                />
                              </div>
                            </>
                          )}

                          
                          { isPopup[1] === "Slot Two" && (
                            <>
                              <div className={style.uploader_single}>
                                <AudioUpload
                                  setIsEditSpinner={setIsEditSpinner}
                                  setPlaylistToDisplay={setPlaylistToDisplay}
                                  setUser={setUser}
                                  setIsPopup={setIsPopup}
                                  song={song}
                                  identification="After"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              null
            )}


            {playlist?.theme && playlist.theme.display_user ? (
              <a
                className={style.author_link}
                style={{ color: `${playlist.theme.text_secondary}` }}
                href={`/${playlist.user.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {playlist?.user?.username}
              </a>
            ) : null}

            { playlist?.theme?.display_blurb ?
            <a href="https://soundtoggle.io" target="_blank">
              <div className={style.logo_crop}>
                <img
                  className={style.player_logobrand}
                  src={siteLogo} alt="SoundToggle Logo"
                />
                {/* <SoundToggleLogoIcon /> */}
              </div>
            </a>
            : null }
          </ul>
        </div>
      </div>

      {visibleSpinner}
    </>
  );
}
