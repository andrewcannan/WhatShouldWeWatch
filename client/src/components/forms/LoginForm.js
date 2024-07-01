import React from "react";


const LoginForm = () => {
    return (
        <form>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingUsername" placeholder="Username"></input>
                <label for="floatingUsername">Username</label>
            </div>
                <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
                <label for="floatingPassword">Password</label>
            </div>
            <button type="submit" class="btn btn-danger">Submit</button>
        </form>
    );
}

export default LoginForm;