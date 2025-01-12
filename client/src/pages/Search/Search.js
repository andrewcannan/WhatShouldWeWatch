import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  showSuccessToast, showErrorToast } from '../../components/ToastHelper.js'
import { getSessionCookie } from '../../components/CookieUtil.js'
import SearchForm from '../../components/forms/SearchForm';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';
import './Search.css'
import ShowDetails from '../../components/ShowDetails';


const Search = () => {
    const [ searchResults, setSearchResults ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = location.state?.groupId;
    const submitButtonText = 'Add to List'

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleSelectedItem = (item) => {
        setSelectedItem(item);
    };

    const handleCancelDetails = () => {
        setSelectedItem(null);
    };

    const handleCancelSearch = () => {
        navigate(`/groups/${groupId}`)
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('/add_show', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({groupId, selectedItem})
            });

            if (response.ok) {
                const data = await response.json();
                showSuccessToast(data.message);
                navigate(`/groups/${groupId}`)
            } else {
                const errorData = await response.json();
                showErrorToast(errorData.error);
                
            }
        } catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    };

    return(
        <div className='search'>
            <LogoNav />
            {!selectedItem && (
            <>
                <div className='form-wrapper mb-3'>
                    <SearchForm onSearchResults={handleSearchResults} onCancel={handleCancelSearch} />
                </div>
                <div>
                    {searchResults.map((item) => (
                        <div className='row mb-3' key={item.id} onClick={() => handleSelectedItem(item)}>
                            <div className='col-6 col-md-4'>
                                <img className='poster clickable' src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name}></img>
                            </div>
                            <div className='col-6 col-md-8 d-flex justify-content-center align-items-center'>
                                <p className='text-center clickable'>{item.title || item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            )}

            {selectedItem && (
            <ShowDetails item={selectedItem} onCancel={handleCancelDetails} onSubmit={handleSubmit} buttonText={submitButtonText} />
            )}

            <BottomNav groupId={groupId} />
        </div>
    )
}

export default Search;