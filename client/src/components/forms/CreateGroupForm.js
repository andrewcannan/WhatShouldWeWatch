import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate;
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

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    }

    const handleImageSelect = (image) => {
        setFormData({ ...formData, avatar: image });
        document.querySelector('.btn-close').click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
    };

    return(
        <div className="create-group-form">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label className="form-label">Select Avatar:</label>
                        <div data-bs-toggle="modal" data-bs-target="#avatarModal" style={{ cursor: 'pointer', border: '1px solid #000', width: '100px', height: '100px' }}>
                            {formData.avatar ? <img src={avatars[formData.avatar]} alt={formData.avatar} width="100" height="100" /> : <img src={createGroup} alt='Create group avatar' width="100" height="100" />}
                        </div>
                    </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="groupName" value={formData.groupName} onChange={handleChange} placeholder="Group Name" required></input>
                    <label htmlFor="groupName">Group Name</label>
                </div>
                <button type="submit" className="btn btn-danger mb-3">Create</button>
                <button type="button" className="btn btn-outline-secondary" onClick={navigate('/groups')}>Cancel</button>
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
                                    <div key={index} onClick={() => handleImageSelect(image)} style={{ cursor: 'pointer', margin: '10px' }}>
                                        <img src={avatars[image]} alt={image} width="100" height="100" />
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