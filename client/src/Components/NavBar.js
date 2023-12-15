import style from '../StyleSheets/NavBar.module.css';
import { Link } from 'react-router-dom';

import siteLogo from '../Assets/soundtoggle-logo.svg';
import Avatar from '../Assets/placeholder-avatar.png';



export default function NavBar ({ user }) {

    return (
        <>

            <div id={style.nav_container}>
                <Link to="/" className={style.nav_items}><img className={style.site_logo} src={siteLogo} alt="SoundToggle Logo"></img></Link>
                <div className={style.links_container}>
                    <Link to="/home" className={style.nav_link}>About</Link>
                    {/* <Link to="/setup" className={style.nav_link}>Setup</Link>
                    <Link to="/pricing" className={style.nav_link}>Pricing</Link> */}
                    {user?.power === 'admin' ? (
                    <>
                        <Link to="/admin" className={style.nav_link}>Admin</Link>
                    </>
                    ) : <div></div>}
                </div>
                <Link to={ user ? user.username : "/login"} className={style.user_icon} style={{ textDecoration: 'none' }}><img src={user?.avatar_url ? user.avatar_url : Avatar}></img><span>{!user ? "Log in" : null}</span></Link>
            </div>
        </>
    )
}