import style from '../StyleSheets/Logout.module.css';




export default function Logout ({ setUser, user, handleLogout }) {
    

    return (
        <>
            <button className={style.logout_button} onClick={() => handleLogout()}>Log Out</button>
        </>
    )
}