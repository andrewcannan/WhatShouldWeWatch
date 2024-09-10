import React, { useState } from 'react';
import SearchForm from '../../components/forms/SearchForm';
import LogoNav from '../../components/LogoNav';
import './Search.css'


const Search = () => {
    const [ searchResults, setSearchResults ] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return(
        <div className='search'>
            <LogoNav />
            <div className='form-wrapper mb-3'>
                <SearchForm onSearchResults={handleSearchResults} />
            </div>
            <div>
                {searchResults.map((item) => (
                    <div className='row mb-3' key={item.id}>
                        <div className='col-6 col-md-4'>
                            <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name}></img>
                        </div>
                        <div className='col-6 col-md-8 d-flex justify-content-center align-items-center'>
                            <p className='text-center'>{item.title || item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search;