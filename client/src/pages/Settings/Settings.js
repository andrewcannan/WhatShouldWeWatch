import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';
import { getSessionCookie } from '../../components/CookieUtil.js'
import {  showSuccessToast, showErrorToast } from '../../components/ToastHelper.js'
import EditGroupForm from "../../components/forms/EditGroupForm.js";


const Settings = () => {
    const [ editGroupSelected, setEditGroupSelected ] = useState(false);
    const [ manageShowsSelected, setManageShowsSelected ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = Number(location.state?.groupId);
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

    return (
        groupData && (
        <div className="settings">
            <LogoNav />

            {!editGroupSelected && !manageShowsSelected && (
                <>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-md-offset-3">
                            <h1 className='text-center'>
                                Settings
                            </h1>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-md-offset-3">
                            <h3>
                               Invite Code : {groupData.code}
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-md-offset-3">
                            <h3 onClick={() => setEditGroupSelected(true)}>
                                Edit Group
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-md-offset-3">
                            <h3 onClick={() => setManageShowsSelected(true)}>
                                Manage Shows/Movies
                            </h3>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-md-offset-3">
                            <h3>
                                Delete Group
                            </h3>
                        </div>
                    </div>
                </>
            )}

            {editGroupSelected && (
                <EditGroupForm />
            )}

            <BottomNav groupId={groupId} />
        </div>
        )
    );
};

export default Settings;