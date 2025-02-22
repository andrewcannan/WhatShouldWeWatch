import React, { useState } from "react";
import { showSuccessToast, showErrorToast } from '../ToastHelper.js'



const SearchForm = ({ onSearchResults, onCancel }) => {
    const [formData, setFormData] = useState('');

    const handleChange = (e) => {
        setFormData(e.target.value);
    };
    const serverURL = process.env.REACT_APP_SERVER_API;

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverURL}/search_tmdb?searchKeyword=${formData}`, {
                method: 'GET',
                credentials: 'include'
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
                <input type="text" className="form-control" id="searchKeyword" onChange={handleChange} placeholder="Enter Movie/TV show" required></input>
                <label htmlFor="searchKeyword">Enter Movie/TV show</label>
            </div>
            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-outline-light" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-danger">Submit</button>
            </div>
        </form>
    )
};

export default SearchForm;