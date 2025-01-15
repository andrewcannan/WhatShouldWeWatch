import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';
import { getSessionCookie } from '../../components/CookieUtil.js';
import {  showSuccessToast, showErrorToast } from '../../components/ToastHelper.js';
import EditGroupForm from "../../components/forms/EditGroupForm.js";
import ConfirmModal from "../../components/ConfimModal.js";
import './Settings.css';


const Settings = () => {
    const [ editGroupSelected, setEditGroupSelected ] = useState(false);
    const [ manageShowsSelected, setManageShowsSelected ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = Number(location.state?.groupId);
    const initialAllShows = location.state?.allShows;
    const [ allShows, setAllShows ] = useState(initialAllShows)
    const [ groupData, setGroupData ] = useState(null);
    const [ modalBodyText, setModalBodyText ] = useState(null)
    const [ modalSubmit, setModalSubmit ] = useState(null);
    const serverURL = process.env.REACT_APP_SERVER_API;

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch(`${serverURL}/getGroups`, {
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
    }, [groupId, serverURL]);

    const handleEditCancel = () => {
        setEditGroupSelected(false);
    }

    const handleSettingsClick = () => {
        setManageShowsSelected(false);
    }

    const handleManageCancel = () => {
        setManageShowsSelected(false);
    }

    const handleRemoveShow = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch(`${serverURL}/remove_show`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        groupId: groupId,
                        selectedItem: selectedItem,
                      }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    showErrorToast(errorData.error);
                    throw new Error(errorData);
                }
    
                const data = await response.json();
                showSuccessToast(data.message);
                const updatedShows = allShows.filter((show) => show.id !== selectedItem.id);
                setSelectedItem(null);
                setAllShows(updatedShows);
            }
            catch(error) {
                showErrorToast('An unexpected error occurred.');
                console.error(error);
            }
        };

        const handleLeaveGroup = async () => {
            try {
                const response = await fetch(`${serverURL}/leave_group`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        groupId: groupId
                      }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    showErrorToast(errorData.error);
                    throw new Error(errorData);
                }
    
                const data = await response.json();
                showSuccessToast(data.message);
                navigate('/groups')
            }
            catch(error) {
                showErrorToast('An unexpected error occurred.');
                console.error(error);
            }
        };

        const handleDeleteGroup = async () => {
            try {
                const response = await fetch(`${serverURL}/delete_group`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        groupId: groupId
                      }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    showErrorToast(errorData.error);
                    throw new Error(errorData);
                }
    
                const data = await response.json();
                showSuccessToast(data.message);
                navigate('/groups')
            }
            catch(error) {
                showErrorToast('An unexpected error occurred.');
                console.error(error);
            }
        };

        const handleDeleteAccount = async () => {
            try{
                const response = await fetch(`${serverURL}/delete_user`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    showErrorToast(errorData.error);
                    throw new Error(errorData);
                }

                const data = await response.json();
                showSuccessToast(data.message);
                navigate('/');
            }
            catch(error) {
                showErrorToast('An unexpected error occurred.');
                console.error(error);
            }
        }

        const handleLogout = async () => {        
                try {
                    const response = await fetch(`${serverURL}/logout`);
        
                    if (response.ok) {
                        const data = await response.json();
                        showSuccessToast(data.message);
                        navigate('/')
                    } 
                } catch(error) {
                    showErrorToast('An unexpected error occurred.');
                    console.error(error);
                }
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
                            <h3 className='clickable' onClick={() => setEditGroupSelected(true)}>
                                Edit Group
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 className='clickable' onClick={() => setManageShowsSelected(true)}>
                                Manage Shows/Movies
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 className="text-danger-emphasis clickable" data-bs-toggle="modal" data-bs-target="#confirmModal"
                                onClick={() => {setModalBodyText('Leave this group permanently?');
                                setModalSubmit(() => handleLeaveGroup);}}>
                                Leave Group
                            </h3>
                            <ConfirmModal modalBodyText={modalBodyText} onSubmit={modalSubmit}/>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 className="text-danger-emphasis clickable" data-bs-toggle="modal" data-bs-target="#confirmModal"
                                onClick={() => {setModalBodyText('Delete this group permanently? Only group creator can delete group.');
                                    setModalSubmit(() => handleDeleteGroup);
                                }}>
                                Delete Group
                            </h3>
                            <ConfirmModal modalBodyText={modalBodyText} onSubmit={modalSubmit}/>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 className="text-danger-emphasis clickable" data-bs-toggle="modal" data-bs-target="#confirmModal"
                                onClick={() => {setModalBodyText('Delete this account permanently?');
                                    setModalSubmit(() => handleDeleteAccount);
                                }}>
                                Delete Account
                            </h3>
                            <ConfirmModal modalBodyText={modalBodyText} onSubmit={modalSubmit}/>
                        </div>
                    </div>

                    <div className="row mb-3 ps-3">
                        <div className="col-12 col-md-6 offset-md-3">
                            <h3 className="text-danger-emphasis clickable"
                                onClick={() => handleLogout()}>
                                Logout
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
                <>
                    <div className="row mb-3">
                        <div className="col">
                            <button type="button" className="btn btn-outline-dark text-white" onClick={() => {handleManageCancel()}}><i className="fa-solid fa-chevron-left"></i> Back</button>
                        </div>
                    </div>
                    {allShows.map((item) => (
                        <div className='row all-shows mb-3' key={item.id}>
                            <div className='col-6 col-md-4'>
                                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name}></img>
                            </div>
                            <div className='col-6 col-md-8 d-flex flex-column justify-content-center align-items-center'>
                                <div className="row">
                                    <p className='text-center'>{item.title || item.name}</p>
                                </div>
                                    <div className="row">
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={() => setSelectedItem(item)}>Remove</button>
                                </div>
                            </div>
                            <ConfirmModal modalBodyText={`Remove "${selectedItem? selectedItem.title|| selectedItem.name: ''}" from your watchlist?`} onSubmit={handleRemoveShow}/>
                        </div>
                    ))}
                </>
            )}

            <BottomNav groupId={groupId} allShows={allShows} onSettingsClick={handleSettingsClick}/>
        </div>
        )
    );
};

export default Settings;