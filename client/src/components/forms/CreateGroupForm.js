import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../ToastHelper.js'
import { getSessionCookie } from '../CookieUtil';

import avatar1 from '../../assets/images/avatar1.jpg';
import avatar2 from '../../assets/images/avatar2.jpg';
import avatar3 from '../../assets/images/avatar3.jpg';
import avatar4 from '../../assets/images/avatar4.jpg';
import avatar5 from '../../assets/images/avatar5.jpg';
import avatar6 from '../../assets/images/avatar6.jpg';
import avatar7 from '../../assets/images/avatar7.jpg';
import avatar8 from '../../assets/images/avatar8.jpg';
import avatar9 from '../../assets/images/avatar9.jpg';
import createGroup from '../../assets/images/createGroup.jpg'


const CreateGroupForm = () => {
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        avatar: '',
        groupName: ''
    });
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
        } 
    }, [navigate]);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    }

    const handleImageSelect = (image) => {
        setFormData({ ...formData, avatar: image });
        document.querySelector('.btn-close').click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.avatar) {
            return
        }

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await fetch('/create_group', {
                method: 'POST',
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
    }


    return(
        <div className="create-group-form">
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                        <label className="form-label mb-3">Select Avatar:</label>
                        <div data-bs-toggle="modal" data-bs-target="#avatarModal">
                            {formData.avatar ? <img className="avatar-image" src={avatars[formData.avatar]} alt={formData.avatar}/> : <img className="avatar-image" src={createGroup} alt='Create group avatar'/>}
                        </div>
                    </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="groupName" value={formData.groupName} onChange={handleChange} placeholder="Group Name" required></input>
                    <label htmlFor="groupName">Group Name</label>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-danger">Create</button>
                    <button type="button" className="btn btn-outline-light" onClick={() => navigate('/groups')}>Cancel</button>
                </div>
            </form>

            <div className="modal fade" id="avatarModal" tabIndex="-1" aria-labelledby="avatarModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="avatarModalLabel">Select an Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-wrap">
                                {Object.keys(avatars).map((image, index) => (
                                    <div className="avatar-select" key={index} onClick={() => handleImageSelect(image)}>
                                        <img className="avatar-image" src={avatars[image]} alt={image}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateGroupForm;