import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
export const Header = () => {
  const [user, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      console.log(response.data); // Log the user data
      setUserData(response.data);
    } catch (error) {
      console.error(error.message); // Proper error logging
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <header className="site-header" style={{ "background-color": "#51e2f5" }}>
        <div className="site-identity">
          <h1>
            <a href="#">GoogleAuth</a>
          </h1>
        </div>
        <nav className="site-navigation">
          <ul className="nav">
            {Object.keys(user)?.length > 0 ? (
              <>
                <div>
                  <p>Welcome, {user.name}!</p>
                  {/* <NavLink to="/profile">Profile</NavLink> */}
                </div>
              </>
            ) : (
              <>
                <div>
                  <NavLink to="/login">Login</NavLink>
                </div>
              </>
            )}

            {/* <li>
              <NavLink to="/login">Login</NavLink>
            </li> */}

            {/* <li>
              <NavLink to="/login">Arjun Rajput</NavLink>
            </li> */}

            {/* <li>
            <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" width={40} alt="" />
            </li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
};
