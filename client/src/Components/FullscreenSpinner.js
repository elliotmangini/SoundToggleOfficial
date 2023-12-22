import { useState, useEffect } from 'react';
import style from '../StyleSheets/FullscreenSpinner.module.css';

export default function FullscreenSpinner() {
    const messageArray = [
        "Making Magic Happen . . .",
        "Getting setup . . .",
        "Adding exciters . . . (just kidding)",
        "Double-checking your ones and zeros",
        "Dotting your T's and crossing your eyes",
        "Pumping up the jam",
        "Tweaking the tone. Almost there . . .",
        "Adding Schrödinger's compression",
        "Handling your audio with care",
        "Whoops, dropped the bass!",
        "Loading melodies from the cosmic jukebox",
        "Warming up the sound waves",
        "Turning it up to 11 . . .",
        "Patience, audiophile. Masterpieces take time!",
        "Gathering rhythms, harmonies, and good vibes!",
        "Analyzing soundscapes . . . before and after.",
        "Comparing audio worlds . . . loading the difference.",
        "Syncing tones, unveiling transformations.",
        "Exploring contrasts in audio realms . . . loading.",
        "Preparing the magic of sonic change . . . almost there.",
        "Syncing past and present sounds... hold on.",
        "Thinking really hard . . .",
        "Loading differences, one beat at a time.",
        "Comparing echoes of the past and present",
    ];

    const initialMessageIndex = Math.floor(Math.random() * messageArray.length);
    const [loadMessage, setLoadMessage] = useState(messageArray[initialMessageIndex]);
    const [prevMessageIndex, setPrevMessageIndex] = useState(-1);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * messageArray.length);
            while (randomIndex === prevMessageIndex) {
                randomIndex = Math.floor(Math.random() * messageArray.length);
            }
            setPrevMessageIndex(randomIndex);
            setLoadMessage(messageArray[randomIndex]);
        }, 5000); // Change message every 5 seconds

        return () => clearInterval(messageInterval);
    }, [messageArray, prevMessageIndex]);

    return (
        <div className={style.fullscreen_div}>
            <div className={style.centered_panel}>
                <div className={style.lds_grid}>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                </div>
                <div className={style.load_message}>{loadMessage}</div>
            </div>
        </div>
    );
}
