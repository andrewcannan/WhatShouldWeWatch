import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../ToastHelper.js'



const SearchForm = ({ onSearchResults }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/search_tmdb?searchKeyword=${formData}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                showSuccessToast(data.message);
                onSearchResults(data.results || []); //pass results back to parent component
            } else {
                const errorData = await response.json();
                showErrorToast(errorData.error)
            }
        } catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="searchKeyword" onChange={handleChange} required></input>
                <label htmlFor="searchKeyword">Enter Movie/TV show</label>
            </div>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-danger">Submit</button>
                <button type="button" className="btn btn-outline-light" onClick={() => navigate('/')}>Cancel</button>
            </div>
        </form>
    )
};

export default SearchForm;