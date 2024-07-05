import React, { useState, useEffect } from 'react';
import { getSessionCookie } from './cookieUtil';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from './ToastHelper';


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

    return (
        <div>
            <h1>
                Welcome back!
            </h1>
            <div className='card-deck'>
                {groups.map((group) => (
                    <div className="card">
                        <img className="card-img-top" src={`../../assets/images/${group.avatar}.jpg`} alt="Group avatar"></img>
                        <div className="card-body">
                            <p className="card-text">{group.name}</p>
                        </div>
                    </div>
                ))}
                <div className="card">
                        <img className="card-img-top" src={'../../assets/images/createGroup.jpg'} alt="Create Group avatar"></img>
                        <div className="card-body">
                            <p className="card-text">Create Group</p>
                        </div>
                    </div>
                <div className="card">
                    <img className="card-img-top" src={'../../assets/images/joinGroup.jpg'} alt="Join Group avatar"></img>
                    <div className="card-body">
                        <p className="card-text">Join Group</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupsList;