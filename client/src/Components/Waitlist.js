import {useEffect, useRef, useState} from 'react';

import style from '../StyleSheets/Waitlist.module.css';

import placeholderVideo from '../Assets/placeholder_video.mp4';


// import jsonp from 'jsonp';


export default function Waitlist ({}) {
    const [FNAME , setFNAME] = useState("");
    const [LNAME , setLNAME] = useState("");
    const [PHONE , setPHONE] = useState("");
    const [EMAIL , setEMAIL] = useState("");

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const playVideo = () => {
            if (video) {
                video.play().catch(error => {
                    // Autoplay was prevented, handle the error here
                    console.error('Autoplay was prevented:', error);
                });
            }
        };

        playVideo(); // Try to play the video when the component mounts

        return () => {
            document.removeEventListener('click', playVideo);
        };
    }, []);

    const mcAPIkey = process.env.REACT_APP_MC_API_KEY;

    function handleSubmit (e) {
        e.preventDefault();
        console.log(FNAME, LNAME, EMAIL, PHONE);

        fetch("https://us21.api.mailchimp.com/3.0/lists/aa4ff9933d/members",{
            method: 'POST',
            body: JSON.stringify({
                "email_address": EMAIL,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": FNAME,
                    "LNAME": LNAME,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((r) => {
            if (r.ok) {
                alert("success");
            } else {
                alert("error");
            }
        })
    }


    return (
        <>
            <h1 className={style.title}>Welcome to <span>SoundToggle</span></h1>
            <h1 className={style.title}> we're glad you're here!</h1>
            <div className={style.flex_container}>
                <div className={style.left}>
                    <div className={style.body_indent}>
                        <p>Soundtoggle is built to do one thing- <span>showcase the before and after of your audio in a way people can see, hear, and feel</span>. It was built by audio professionals, for audio professionals, and is driven by community feedback.</p>
                        <h3>So If You're Ready To:</h3>
                        <ul className={style.list}>
                            <li>Present your work like a professional</li>
                            <li>Book more clients</li>
                            <li>Collect more leads</li>
                        </ul>
                        <h3 className={style.footnote}>Then <span>fill out the form</span> to get priority access to the best way to showcase your audio on the web.</h3>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.form_container}>
                        <h1 className={style.form_title}>Join The Waitlist</h1>
                        <form 
                            className={style.info_form}
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <input 
                                placeholder="First Name"
                                value={FNAME}
                                onChange={(e) => setFNAME(e.target.value)}
                            ></input>
                            <input 
                                placeholder="Last Name"
                                value={LNAME}
                                onChange={(e) => setLNAME(e.target.value)}
                            ></input>
                            <input 
                                placeholder="Email"
                                value={EMAIL}
                                onChange={(e) => setEMAIL(e.target.value)}
                            ></input>
                            <input 
                                placeholder="Phone Number"
                                value={PHONE}
                                onChange={(e) => setPHONE(e.target.value)}
                            ></input>
                            <button
                                type="submit"
                            >Reserve My Spot</button>
                        </form>
                    </div>
                
                </div>
            </div>
            <div className={style.video_container}>
                <video ref={videoRef} src={placeholderVideo} muted controls></video>
            </div>
        </>
    )
}