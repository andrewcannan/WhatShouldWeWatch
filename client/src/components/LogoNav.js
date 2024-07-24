import React from 'react';
import logo from '../assets/images/logo.png'

const LogoNav = () => {
    return (
        <nav className="navbar fixed-top" style={{backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>
            <a className="navbar-brand d-flex align-items-center" href="/" style={{ fontFamily: 'Montserrat', marginLeft: '5px', color: '#be1423', fontSize: '3vh', fontWeight: '600' }}>
                <img src={logo} width="60" height="50" className="mr-2" alt="What Should We Watch Logo"></img>
                What Should We Watch
            </a>
        </nav>
    )
}

export default LogoNav;