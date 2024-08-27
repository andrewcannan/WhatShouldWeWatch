import React from 'react';
import CreateGroupForm from '../../components/forms/CreateGroupForm';
import LogoNav from '../../components/LogoNav';
import LogutBar from '../../components/LogoutBar';
import './CreateGroup.css'


const CreateGroup = () => {
    return(
        <div className='create-group'>
            <LogoNav />
            <div className='form-wrapper'>
                <h1 className='title'>Create Group</h1>
                <CreateGroupForm />
            </div>
            <LogutBar />
        </div>
    )
}

export default CreateGroup;