import React, { useState, useEffect } from 'react';
import { getSessionCookie } from './cookieUtil';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from './ToastHelper';

import avatar1 from '../assets/images/avatar1.jpg';
import avatar2 from '../assets/images/avatar2.jpg';
import avatar3 from '../assets/images/avatar3.jpg';
import avatar4 from '../assets/images/avatar4.jpg';
import avatar5 from '../assets/images/avatar5.jpg';
import avatar6 from '../assets/images/avatar6.jpg';
import avatar7 from '../assets/images/avatar7.jpg';
import avatar8 from '../assets/images/avatar8.jpg';
import avatar9 from '../assets/images/avatar9.jpg';
import createGroup from '../assets/images/createGroup.jpg'
import joinGroup from '../assets/images/joinGroup.jpg';


const GroupsList = () => {
    const navigate = useNavigate();
    const [ groups, setGroups ] = useState([]);
    const avatars = {
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
        avatar7,
        avatar8,
        avatar9
    }

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } else {
            fetchGroups();
        }
    }, [navigate]);

    const fetchGroups = async (user) => {
        try {
            const response = await fetch('/getGroups', {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                showErrorToast(errorData.error)
                throw new Error(errorData)
            }

            const data = await response.json();
            setGroups(data.groups);
        }
        catch (error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    }

    return (
        <div>
            <h1 className='text-center'>
                Welcome back!
            </h1>
            <div className='card-deck'>
                {groups.map((group) => (
                    <div className="card" key={group.id}>
                        <img className="card-img-top" src={avatars[group.avatar]} alt={`Group ${group.id} avatar`}></img>
                        <div className="card-body">
                            <p className="card-text">{group.name}</p>
                        </div>
                    </div>
                ))}
                <div className="card">
                        <img className="card-img-top" src={createGroup} alt="Create Group avatar"></img>
                        <div className="card-body">
                            <p className="card-text">Create Group</p>
                        </div>
                    </div>
                <div className="card">
                    <img className="card-img-top" src={joinGroup} alt="Join Group avatar"></img>
                    <div className="card-body">
                        <p className="card-text">Join Group</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupsList;