import React from 'react';
import JoinGroupForm from '../../components/forms/JoinGroupForm';
import LogoNav from '../../components/LogoNav';


const JoinGroup = () => {
    return(
        <div className='join-group'>
            <LogoNav />
            <JoinGroupForm />
        </div>
    )
}

export default JoinGroup;