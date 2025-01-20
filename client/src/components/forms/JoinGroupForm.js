import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../ToastHelper.js'
import avatars from '../Avatars.js'

const JoinGroupForm = () => {
    const navigate = useNavigate();
    const [ group, setGroup ] = useState(null);
    const [ formData, setFormData ] = useState({
        groupCode: ''
    });
    const serverURL = process.env.REACT_APP_SERVER_API;

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    };

    const handleSearchGroup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverURL}/join_group?groupCode=${formData.groupCode}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                showSuccessToast(data.message);
                setGroup(data.group);
                setFormData({groupCode: data.group.group_code});
            } else {
                const errorData = await response.json();
                showErrorToast(errorData.error)
            }
        } catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    };

    const handleJoinGroup = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key])
        };

        try {
            const response = await fetch(`${serverURL}/join_group`, {
                method: 'POST',
                credentials: 'include',
                body: form
            });

            if (response.ok) {
                const data = await response.json();
                showSuccessToast(data.message);
                navigate('/groups');
            } else {
                const errorData = await response.json();
                showErrorToast(errorData.error);
            }
        } catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    };

    return (
        <div>
            { group ? (
                <div className="group-details">
                    <h3 className="mb-3 text-center">{group.group_name}</h3>
                    <img src={avatars[group.avatar]} alt={group.group_name} className="avatar-image mb-3" />
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={handleJoinGroup}>Join Group</button>
                        <button className="btn btn-outline-light" onClick={() => setGroup(null)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSearchGroup}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="groupCode" value={formData.groupCode} onChange={handleChange} placeholder="Group Code" required></input>
                        <label htmlFor="groupCode">Enter Group Code</label>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-light" onClick={() => navigate('/groups')}>Cancel</button>
                        <button type="submit" className="btn btn-danger">Submit</button>
                    </div>
                </form>
            )}
        </div>
    )
};

export default JoinGroupForm