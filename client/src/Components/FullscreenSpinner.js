import { useState, useEffect } from 'react';
import style from '../StyleSheets/FullscreenSpinner.module.css';

export default function FullscreenSpinner() {
    const messageArray = [
        "Making Magic Happen . . .",
        "Getting setup . . .",
        "Adding exciters . . . (just kidding)",
    ];

    const [loadMessage, setLoadMessage] = useState(messageArray[0]);
    const [messageIndex, setMessageIndex] = useState(0);
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setShowMessage(!showMessage);
            if (!showMessage) {
                // Update the message index using the previous state value
                setMessageIndex((prevIndex) => (prevIndex + 1) % messageArray.length);
                // Use the updated messageIndex directly
                setLoadMessage(messageArray[messageIndex]);
            }
        }, showMessage ? 4000 : 1000); // 5 seconds message + 2 seconds blank

        return () => clearInterval(messageInterval);
    }, [showMessage, messageIndex, messageArray]);

    return (
        <div className={style.fullscreen_div}>
            <div className={style.centered_panel}>
                <div className={style.lds_grid}>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                </div>
                <div className={style.load_message}>{showMessage ? loadMessage : " "}</div>
            </div>
        </div>
    );
}
