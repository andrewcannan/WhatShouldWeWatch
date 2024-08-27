import React from 'react';
import logo from '../../assets/images/logo.png';
import './Welcome.css'

const Welcome = () => {
    return(
        <div className='welcome'>
            <img src={logo} width="150" height="100" className="logo" alt="What Should We Watch Logo"></img>
            <h1 className='title'>What Should We Watch</h1>
        </div>
    )
}

export default Welcome;