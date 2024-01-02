import style from '../StyleSheets/NavBar.module.css';
import { Link } from 'react-router-dom';
import {useEffect, useState } from 'react';

import siteLogo from '../Assets/soundtoggle-logo.svg';
import mobileLogo from '../Assets/soundtoggle-icon-only.png';
import Avatar from '../Assets/placeholder-avatar.png';



export default function NavBar ({ user }) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update window width when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>

            <div id={style.nav_container}>
                <Link to="/" className={style.nav_items}>
                    <img 
                        className={style.site_logo} 
                        draggable="false" 
                        src={windowWidth > 700 ? siteLogo : mobileLogo} 
                        style={{ width: `${windowWidth > 700 ? "" : '80px'}`}}
                        alt="SoundToggle Logo">
                    </img>
                </Link>
                <div className={style.links_container}>
                    <Link to="/about" className={style.nav_link}>About</Link>
                    <Link to="/setup" className={style.nav_link}>Setup</Link>
                    {/* <Link to="/pricing" className={style.nav_link}>Pricing</Link> */}
                    {user?.power === 'admin' ? (
                    <>
                        <Link to="/admin" className={style.nav_link}>Admin</Link>
                    </>
                    ) : <div></div>}
                </div>
                <Link to={ user ? user.username : "/login"} className={style.user_icon} style={{ textDecoration: 'none' }}><img src={user?.avatar_url ? user.avatar_url : Avatar}></img><span>{!user ? "" : null}</span></Link>
            </div>
        </>
    )
}