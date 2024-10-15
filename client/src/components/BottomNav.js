import React from 'react';

const BottomNav = () => {
    return (
       <div className='row fixed-bottom border-top border-secondary text-white text-center' style={{backgroundColor: '#000', fontFamily: 'Roboto'}}>
            <div className='col-3 border-end border-secondary pt-3'>
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>Browse</p>
            </div>
            <div className='col-3 border-end border-secondary pt-3'>
                <i class="fa-solid fa-film"></i>
                <p>Movies</p>
            </div>
            <div className='col-3 border-end border-secondary pt-3'>
                <i class="fa-solid fa-tv"></i>
                <p>TV</p>
            </div>
            <div className='col-3 pt-3'>
                <i class="fa-solid fa-gear"></i>
                <p>Settings</p>
            </div>
       </div>
    )
}

export default BottomNav;