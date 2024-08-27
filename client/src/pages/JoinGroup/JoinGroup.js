import React from 'react';
import JoinGroupForm from '../../components/forms/JoinGroupForm';
import LogoNav from '../../components/LogoNav';
import './JoinGroup.css'


const JoinGroup = () => {
    return(
        <div className='join-group'>
            <LogoNav />
            <div className='form-wrapper'>
                <h1 className='title text-center mb-3'>Join Group</h1>
                <JoinGroupForm />
            </div>
        </div>
    )
}

export default JoinGroup;