import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionCookie } from './CookieUtil';
import logo from '../assets/images/logo.png'

const LogoNav = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!getSessionCookie()) {
            navigate('/');
        }
        else {
            navigate('/groups')
        }
    };

    return (
        <nav className="navbar fixed-top" style={{backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>
            <div className="navbar-brand d-flex align-items-center clickable" style={{ fontFamily: 'Montserrat', marginLeft: '5px', color: '#be1423', fontSize: '3vh', fontWeight: '600' }} onClick={handleClick}>
                <img src={logo} width="60" height="50" className="mr-2" alt="What Should We Watch Logo"></img>
                What Should We Watch
            </div>
        </nav>
    )
}

export default LogoNav;