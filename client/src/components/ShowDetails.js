import React from "react";

const ShowDetails = ({ item, onCancel}) => {
    return (
        <div className="show-details">
            <div className="row">
                <div className="col-12">
                    <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name}></img>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>{item.title || item.name}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <p>Released: {item.release_date}</p>
                </div>
                <div className="col-4">
                    <p>Rating: {item.vote_average}/5</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>{item.overview}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-light" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="btn btn-danger">Add to List</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ShowDetails;