import React from "react";


const LoginForm = () => {
    return (
        <form>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingUsername" placeholder="Username"></input>
                <label for="floatingUsername">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
                <label for="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-danger mb-3">Submit</button>
        </form>
    );
}

export default LoginForm;