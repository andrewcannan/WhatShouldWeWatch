import React from "react";

const ConfirmModal = ({ modalBodyText, onSubmit }) => {
    return(
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Are You Sure?</h1>
            </div>
            <div className="modal-body">
                {modalBodyText}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal" onClick={onSubmit}>Confirm</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default ConfirmModal