import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

import './Welcome.css'

const Welcome = () => {
    const navigate = useNavigate();
    const [ isExiting, setIsExiting ] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => navigate('/login'), 500)
        }, 5000);

        return () => clearTimeout(timeout);
    }, [navigate])

    return(
        <div className={`welcome ${isExiting? 'exit' : ''}`}>
            <img src={logo} className="logo" alt="What Should We Watch Logo"></img>
            <h1 className='title'>What Should We Watch</h1>
        </div>
    )
}

export default Welcome;