import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../designs/Auth.css';
import '../designs/Profile.css';
import { getItem } from '../helpers/localstorage';
import useAuth from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import { useHistory } from 'react-router';

import { AuthService } from '../services/auth';

function Profile() {
  const [userData, setUserData] = useState({});
  const { getProfileData, user } = useAuth();
  const [showUpdate, setShowUpdate] = useState(true);
 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const { updateUser } = useAuth();

  function validateEmail(signup_email) {
    //Must contain @, can't be shorter than 8 characters
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(signup_email);
  }
  function validatePassword(signup_password) {
    //  Must contain 8 characters, 1 number, 1 letter and 1 unique character (!#$%/?-.;,:)
    const re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
    return re.test(signup_password);
  }
  function validateUsername(username) {
    //Must be shorter than 20 characters, no spaces, no special characters
    const re = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/;
    return re.test(username);
  }

  useEffect(() => {
    getProfileData().then((data) => setUserData(data)).catch(err=>console.log(err));
  }, [user]);

  const handleSubmit = async () => {
    setErrorMsg('');

    const isUsernameValid = validateUsername(username);

    if (!isUsernameValid) {
      return setErrorMsg('Username must be without special characters!');
    }
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return setErrorMsg('Email must be valid!');
    }

    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      return setErrorMsg(
        'Password must contain at least 8 characters, 1 number, 1 letter & 1 unique character (!#$%/?...)'
      );
    }

    updateUser(username, email, password);
    setShowUpdate(false);
  };

  const UpdateFunction = () =>{
    setShowUpdate(false);
  };

  return (
    <div>
      <div className="profile-cntnr">
        <div className="profile-wrapper">
          
          {showUpdate ? (
            <div>
              <h2>PROFILE</h2>
              <p id="username">
                
                <b> Username:</b>{userData.username}
              </p>
              <p id="email">
                
                <b> Email:</b>{userData.email}
              </p>
              <br/>
              <br/>
              <Button
                text={"Update Profile"}
                className="secondary-btn"
                onClick = {UpdateFunction}
              ></Button>
            </div>
          ):(
            <div className='update-profile'>
              <h1>Update profile</h1>
              <p><b>Email:</b></p>
            <Input 
              type = "text"
              value={userData.email}
              setValue={setEmail}
            /><br/>
            <p><b>Username:</b></p>
            <Input 
              type = "text"
              value={userData.username}
              setValue={setUsername}
            /><br/>
            <p><b>Password:</b></p>
            <Input 
              type = "password"
              value={password}
              setValue={setPassword}
              placeholder="new password"
            /><br/><br/>
            <Button
              text = "UPDATE"
              onClick = {handleSubmit}
              className = "secondary-btn"
            />
          </div>
         )}
        </div>
        <h3 className="errorMsg">{errorMsg}</h3>
      </div>
    </div>
  );
}

export default Profile;
