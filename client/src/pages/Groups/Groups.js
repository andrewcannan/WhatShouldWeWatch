import React from 'react';
import GroupsList from '../../components/GroupsList'
import LogoNav from '../../components/LogoNav';
import './Groups.css';

const Groups = () => {
    return(
        <div className='groups'>
            <LogoNav />
            <GroupsList />
        </div>
    )
}

export default Groups;