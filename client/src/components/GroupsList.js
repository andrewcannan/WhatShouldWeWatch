import React, { useState, useEffect } from 'react';
import { getSessionCookie } from './CookieUtil';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from './ToastHelper';
import avatars from './Avatars';

const GroupsList = () => {
    const navigate = useNavigate();
    const [ groups, setGroups ] = useState([]);

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
                    <img className="card-img-top" src={avatars.createGroup} alt="Create Group avatar"></img>
                    <div className="card-body">
                        <p className="card-text text-center">Create Group</p>
                    </div>
                </div>
                </div>
                <div className={cardClassName()}>
                <div className="card" onClick={() => navigate('/join-group')}>
                    <img className="card-img-top" src={avatars.joinGroup} alt="Join Group avatar"></img>
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