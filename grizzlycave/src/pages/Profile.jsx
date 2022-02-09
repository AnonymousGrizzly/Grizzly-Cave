import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../designs/Auth.css';
import '../designs/Profile.css';
import { getItem } from '../helpers/localstorage';
import useAuth from '../hooks/useAuth';
import { AuthService } from '../services/auth';

function Profile() {
  const [userData, setUserData] = useState({});
  const { getProfileData, user } = useAuth();

  useEffect(() => {
    getProfileData().then((data) => setUserData(data));
  }, [user]);

  return (
    <div>
      <div className="profile-cntnr">
        <div className="profile-wrapper">
          <h2>PROFILE</h2>
          <p id="username">
            <i className="fas fa-user"></i>
            <b> Username:</b>&emsp;&emsp;{userData.username}
          </p>
          <p id="email">
            <i className="fas fa-envelope"></i>
            <b> Email:</b> &emsp;&emsp;&emsp;&ensp;{userData.email}
          </p>
          <br />
          <br />
          <Link to="/update" className="secondary-btn">
            {' '}
            Update Profile <i className="fas fa-long-arrow-alt-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
