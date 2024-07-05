import React, { useState, useEffect } from 'react';
import { getCookie } from './cookieUtil';


const GroupsList = () => {
    const [ user, setUser ] = useState();

    useEffect(() => {
        const userCookie = getCookie('user');
        setUser(userCookie);
    }, []);
}

export default GroupsList;