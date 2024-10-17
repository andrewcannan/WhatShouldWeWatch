import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  showErrorToast } from '../../components/ToastHelper.js'
import { getSessionCookie } from '../../components/CookieUtil.js'
import SearchForm from '../../components/forms/SearchForm';
import LogoNav from '../../components/LogoNav';
import './Search.css'
import ShowDetails from '../../components/ShowDetails';


const Search = () => {
    const [ searchResults, setSearchResults ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = location.state?.groupId;

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

    const handleCancel = () => {
        setSelectedItem(null);
    };

    const handleSubmit = () => {
        
    };

    return(
        <div className='search'>
            <LogoNav />
            {!selectedItem && (
            <>
                <div className='form-wrapper mb-3'>
                    <SearchForm onSearchResults={handleSearchResults} />
                </div>
                <div>
                    {searchResults.map((item) => (
                        <div className='row mb-3' key={item.id} onClick={() => handleSelectedItem(item)}>
                            <div className='col-6 col-md-4'>
                                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name}></img>
                            </div>
                            <div className='col-6 col-md-8 d-flex justify-content-center align-items-center'>
                                <p className='text-center'>{item.title || item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            )}

            {selectedItem && (
            <ShowDetails item={selectedItem} onCancel={handleCancel} onSubmit={handleSubmit} />
            )}
        </div>
    )
}

export default Search;