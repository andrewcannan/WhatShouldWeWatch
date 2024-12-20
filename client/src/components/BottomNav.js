import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ groupId }) => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search', { state: { groupId } });
    };

    const handleWatchListClick = () => {
        navigate(`/groups/${groupId}`)
    }


    return (
       <div className='row fixed-bottom border-top border-secondary text-white text-center' style={{backgroundColor: '#000', fontFamily: 'Roboto'}}>
            <div className='col-4 border-end border-secondary pt-3 nav-item' onClick={handleSearchClick}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <p>Search</p>
            </div>
            <div className='col-4 border-end border-secondary pt-3 nav-item' onClick={handleWatchListClick}>
                <i className="fa-solid fa-tv"></i>
                <p>Watch List</p>
            </div>
            <div className='col-4 pt-3 nav-item'>
                <i className="fa-solid fa-gear"></i>
                <p>Settings</p>
            </div>
       </div>
    )
}

export default BottomNav;