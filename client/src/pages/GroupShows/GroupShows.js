import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionCookie } from '../../components/CookieUtil';
import { showErrorToast } from '../../components/ToastHelper';
import { showSuccessToast } from '../../components/ToastHelper';
import { useDragScroll } from '../../components/Drag-to-Scroll';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';
import ShowDetails from '../../components/ShowDetails';
import './GroupShows.css';
import unavailableImage from '../../assets/images/unavailableImage.jpg';

const GroupShows = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [ allShows, setAllShows ] = useState({});
    const [ showsByGenre, setShowsByGenre ] = useState({});
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ showType, setShowType ] = useState('movie');
    const submitButtonText = 'Remove';
    const modalBodyText = selectedItem?`Remove "${selectedItem.title|| selectedItem.name}" from your watchlist?`: '';
    const serverURL = process.env.REACT_APP_SERVER_API;


    const { getRef, handleDragStart, handleDragEnd, handleDrag } = useDragScroll();

    function groupByGenre(data) {
        const genreMap = {};

        data.forEach(show => {
            show.genres.forEach(genre => {
                if (!genreMap[genre]) {
                    genreMap[genre] = [];
                }
            
            genreMap[genre].push(show);    
            });
        });

        return genreMap;
    };

    const getShows = useCallback(async () => {
        try {
            const response = await fetch(`${serverURL}/groupId=${groupId}`, {
                method: 'GET'
            });

            if (!response.ok) {
                const errorData = await response.json();
                showErrorToast(errorData.error)
                throw new Error(errorData)
            }

            const data = await response.json();
            setAllShows(data);
            const genreData = groupByGenre(data);
            setShowsByGenre(genreData);                
        }
        catch (error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    }, [groupId, setAllShows, serverURL]);

    useEffect(() => {
        getShows();
    }, [getShows]);

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    const handleSelectedItem = (show) => {
        setSelectedItem(show);
    };

    const handleCancelDetails = () => {
        setSelectedItem(null);
    };

    const handleShowType = (type) => {
        setShowType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverURL}/remove_show`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    groupId: groupId,
                    selectedItem: selectedItem,
                  }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                showErrorToast(errorData.error);
                throw new Error(errorData);
            }

            const data = await response.json();
            showSuccessToast(data.message);
            setSelectedItem(null);
            getShows();
        }
        catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    };

    return (
        <div className='group-shows'>
            <LogoNav />
            {!selectedItem && (
                <>
                    <div className='row mb-3 no-gutters'>
                        <div className='d-flex justify-content-around p-3'>
                            <button type="button" className={`btn btn-outline-light ${showType === 'movie' ? 'active' : ''}`} onClick={() => handleShowType('movie')}>Movies</button>
                            <button type="button" className={`btn btn-outline-light ${showType === 'tv' ? 'active' : ''}`}  onClick={() => handleShowType('tv')}>TV</button>
                        </div>
                    </div>

                    {Object.keys(showsByGenre).filter(genre => showsByGenre[genre].some(show => show.media_type === showType)).map((genre, genreIndex) => (
                        <div key={genre} className='row genre-row mb-5 no-gutters'>
                            <p className='h3'>{genre}</p>
                            <div className='card-deck' ref={(el) => {
                                        const ref = getRef(genreIndex);
                                        if (ref) {
                                            ref.current = el;
                                        }
                                    }}
                                    onMouseDown={(e) => handleDragStart(genreIndex, e)}
                                    onMouseLeave={() => handleDragEnd(genreIndex)}
                                    onMouseUp={() => handleDragEnd(genreIndex)}
                                    onMouseMove={(e) => handleDrag(genreIndex, e)}>
                                {showsByGenre[genre].filter(show => show.media_type === showType).map((show, index) => (
                                    <div key={show.id || index} className='card' onClick={() => handleSelectedItem(show)} draggable='false'>
                                        <img 
                                            className='card-img-top' 
                                            src={show.poster_path ? `https://image.tmdb.org/t/p/w200${show.poster_path}` : unavailableImage} 
                                            alt={show.title || show.name} 
                                            draggable='false' 
                                        />
                                        <p className='h5 title'>{show.title || show.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}

            {selectedItem && (
                <ShowDetails item={selectedItem} onCancel={handleCancelDetails} onSubmit={handleSubmit} buttonText={submitButtonText} modalBodyText={modalBodyText} />
            )}
            <BottomNav groupId={groupId} allShows={allShows} />
        </div>
    );
};

export default GroupShows;