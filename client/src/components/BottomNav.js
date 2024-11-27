import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ groupId, handleShowType }) => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search', { state: { groupId } });
    };


    return (
       <div className='row fixed-bottom border-top border-secondary text-white text-center' style={{backgroundColor: '#000', fontFamily: 'Roboto'}}>
            <div className='col-3 border-end border-secondary pt-3 nav-item' onClick={handleSearchClick}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <p>Search</p>
            </div>
            <div className='col-3 border-end border-secondary pt-3 nav-item' onClick={() => handleShowType('movie')}>
                <i className="fa-solid fa-film"></i>
                <p>Movies</p>
            </div>
            <div className='col-3 border-end border-secondary pt-3 nav-item' onClick={() => handleShowType('tv')}>
                <i className="fa-solid fa-tv"></i>
                <p>TV</p>
            </div>
            <div className='col-3 pt-3 nav-item'>
                <i className="fa-solid fa-gear"></i>
                <p>Settings</p>
            </div>
       </div>
    )
}

export default BottomNav;