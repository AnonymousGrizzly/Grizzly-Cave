import React, { useEffect, useState } from 'react';
import '../designs/Profile.css';
import useAuth from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import {Lock, Mail, X, User} from 'react-feather';


function Profile() {
  const [userData, setUserData] = useState({});
  const { getProfileData, user } = useAuth();
  const [showUpdate, setShowUpdate] = useState(true);
 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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


    if(username.length > 0 ){
      const isUsernameValid = validateUsername(username);

      if (!isUsernameValid) {
        return setErrorMsg('Username must be without special characters!');
      }
    }else{
      setUsername(userData.username);
    }
    
    if(email.length > 0){
      const isEmailValid = validateEmail(email);

      if (!isEmailValid) {
        return setErrorMsg('Email must be valid!');
      }
    }else{
      setEmail(userData.email);
    }

    if(password.length > 0){
      const isPasswordValid = validatePassword(password);

      if (!isPasswordValid) {
        return setErrorMsg(
          'Password must contain at least 8 characters, 1 number, 1 letter & 1 unique character (!#$%/?...)'
        );
      }
    }


    updateUser(username, email, password);
    setShowUpdate(false);
  };

  const UpdateFunction = () =>{
    setShowUpdate(false);
  };

  const backUpdate = () => {
    setShowUpdate(true);
  }

  return (
    <div>
      <div className="profile-cntnr">
        <h1>Profile</h1>
        <div className="profile-wrapper">
          {showUpdate ? (
            <div>
              <p id="username" className='icon profile-content'>
                <User size="18"/> &nbsp;
                <b> Username:</b>{userData.username}
              </p>
              <p id="email" className='icon profile-content'>
                <Mail size="18"/> &nbsp;
                <b> Email:</b>{userData.email}
              </p>
              <br/>
              <br/>
              <Button
                text={"Update Profile"}
                className="secondary-btn"
                onClick = {UpdateFunction}
              ></Button>
              <br/>
              <br/>
              <Button
              text = "Delete User"
              onClick = {handleSubmit}
              className = "secondary-btn"
            />
            </div>
          ):(
            <div className='update-profile'>
              <h2>Update profile  &nbsp; &nbsp;<Button
                text = {<X size={"22"}/>}
                onClick = {backUpdate}
                className = "icon-btn"
              /></h2>
              <p className='icon'>
                <Mail size={"18"}/>&nbsp;
                <b>Email:</b>
              </p>
            <Input 
              type = "text"
              placeholder={userData.email}
              setValue={setEmail}
              value={email}
            /><br/>
            <p className='icon'> 
              <User size={"18"}/>&nbsp;
              <b>Username:</b>
            </p>
            <Input 
              type = "text"
              placeholder={userData.username}
              setValue={setUsername}
              value={username}
            /><br/>
            <p className='icon'>
              <Lock size="18"/> &nbsp;
              <b>Password:</b>
            </p>
            <Input 
              type = "password"
              value ={password}
              setValue={setPassword}
              placeholder="new password"
              /><br/>
              <p>
                * Note that restrictions still apply
              </p><br/><br/>
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
