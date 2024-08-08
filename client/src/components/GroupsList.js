import React, { useState, useEffect } from 'react';
import { getSessionCookie } from './CookieUtil';
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

    const cardClassName = () => {
        if (groups.length === 1) {
            return 'col-6 col-sm-4';
        } else if (groups.length > 1) {
            return ' col-6 col-sm-4 col-xl-3';
        } else {
            return 'col-6';
        }
    }

    return (
        <div className='container'>
            <h1 className='text-center'>
                Welcome back!
            </h1>
            <div className='row'>
                {groups.map((group) => (
                    <div className={cardClassName()} key={group.id}>
                    <div className="card" onClick={() => navigate(`/groups/${group.id}`)}>
                        <img className="card-img-top" src={avatars[group.avatar]} alt={`Group ${group.id} avatar`}></img>
                        <div className="card-body">
                            <p className="card-text text-center">{group.name}</p>
                        </div>
                    </div>
                    </div>
                ))}
                <div className={cardClassName()}>
                <div className="card" onClick={() => navigate('/create-group')}>
                    <img className="card-img-top" src={createGroup} alt="Create Group avatar"></img>
                    <div className="card-body">
                        <p className="card-text text-center">Create Group</p>
                    </div>
                </div>
                </div>
                <div className={cardClassName()}>
                <div className="card" onClick={() => navigate('/join-group')}>
                    <img className="card-img-top" src={joinGroup} alt="Join Group avatar"></img>
                    <div className="card-body">
                        <p className="card-text text-center">Join Group</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default GroupsList;