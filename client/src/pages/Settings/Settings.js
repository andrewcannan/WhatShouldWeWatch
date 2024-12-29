import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';
import { getSessionCookie } from '../../components/CookieUtil.js';
import {  showSuccessToast, showErrorToast } from '../../components/ToastHelper.js';
import EditGroupForm from "../../components/forms/EditGroupForm.js";
import './Settings.css';


const Settings = () => {
    const [ editGroupSelected, setEditGroupSelected ] = useState(false);
    const [ manageShowsSelected, setManageShowsSelected ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = Number(location.state?.groupId);
    const allShows = location.state?.allShows;
    const [ groupData, setGroupData ] = useState(null);

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    useEffect(() => {
        const fetchGroups = async () => {
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
                const currentGroup = data.groups.find(group => group.id === groupId);
                setGroupData(currentGroup);
            }
            catch (error) {
                showErrorToast('An unexpected error occurred.');
                console.error(error);
            }
        }
        fetchGroups();
    }, [groupId]);

    const handleEditCancel = () => {
        setEditGroupSelected(false);
    }

    return (
        groupData && (
        <div className="settings">
            <LogoNav />

            {!editGroupSelected && !manageShowsSelected && (
                <>
                    <div className="row mb-5">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h1 className='text-center'>
                                Settings
                            </h1>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3>
                               Invite Code : {groupData.code}
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 onClick={() => setEditGroupSelected(true)}>
                                Edit Group
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 onClick={() => setManageShowsSelected(true)}>
                                Manage Shows/Movies
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 className="text-danger-emphasis">
                                Delete Group
                            </h3>
                        </div>
                    </div>
                </>
            )}

            {editGroupSelected && (
                <>
                <div className="row text-center form-title"><h1>Edit Group</h1></div>
                <EditGroupForm groupData={groupData} handleEditCancel={handleEditCancel} />
                </>
            )}

            {manageShowsSelected && (
                allShows.map((item) => (
                    <div className='row all-shows mb-3' key={item.id}>
                        <div className='col-6 col-md-4'>
                            <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name}></img>
                        </div>
                        <div className='col-6 col-md-8 d-flex flex-column justify-content-center align-items-center'>
                            <div className="row">
                                <p className='text-center'>{item.title || item.name}</p>
                            </div>
                                <div className="row">
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">Remove</button>
                            </div>
                        </div>
                        
                    </div>
                ))
            )}

            <BottomNav groupId={groupId} allShows={allShows}/>
        </div>
        )
    );
};

export default Settings;