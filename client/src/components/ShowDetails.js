import React from "react";

const ShowDetails = ({ item, onCancel, onSubmit}) => {
    return (
        <div className="show-details m-3">
            <div className="row align-items-center">
                <div className="col-12 col-md-4 mb-3">
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="img-fluid mx-auto d-block"></img>
                </div>
                <div className="col-12 col-md-8">
                    <div className="row">
                        <div className="col-12">
                            <p className="display-4">{item.title || item.name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-4">
                            <p>Released: {item.release_date ? item.release_date.split('-').reverse().join('-') : 'Unknown'}</p>
                        </div>
                        <div className="col-6 col-md-4">
                            <p>Rating: {item.vote_average ? item.vote_average.toFixed(1) : 'No rating available'}/10</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <p>{item.overview}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-outline-light" onClick={onCancel}>Cancel</button>
                                <button type="submit" className="btn btn-danger" onSubmit={onSubmit}>Add to List</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ShowDetails;