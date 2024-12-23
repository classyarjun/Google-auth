import React, { useEffect } from "react";
import "./login.css";
import axios from "axios";
export const Login = () => {

const googlelogin = ()=>{
  window.open("http://localhost:5000/auth/google/callback","_self");
}




  return (
    <>
      <div className="container">
        <div className="card">
          <h2>Login</h2>
          <form>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>

            <button type="button" className="login-with-google-btn" onClick={googlelogin}>
              SIGN WITH GOOGLE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
