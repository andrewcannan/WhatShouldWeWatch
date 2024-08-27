import React from 'react';
import GroupsList from '../../components/GroupsList'
import LogoNav from '../../components/LogoNav';
import LogutBar from '../../components/LogoutBar';
import './Groups.css';

const Groups = () => {
    return(
        <div className='groups'>
            <LogoNav />
            <GroupsList />
            <LogutBar />
        </div>
    )
}

export default Groups;