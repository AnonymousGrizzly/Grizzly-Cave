import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import '../designs/Auth.css';
import { HashLink as Link } from 'react-router-hash-link';
import useAuth from '../hooks/useAuth';
import TreesRight from '../images/trees-right.png'
import TreesLeft from '../images/trees-left.png'

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useAuth();

  const handleSubmit = async () => {
    login(username, password);
  };

  const handleKeypress = e => {
    if(e.keyCode === 13){
      handleSubmit();
    }
  }

  return (
    <div>
      <div className="title-cntnr">
        <h1>
          {' '}
          You are about to enter <br />
          <b>GrizzlyCave</b>{' '}
        </h1>
        <br />
        <p>- please provide the necessary information to get inside -</p>
        <br />
        <Link to="/signup" className="secondary-btn">
          {' '}
          Don't have an account? SignUp! <i className="fas fa-sign-in-alt"></i>
        </Link>
      </div>
      <div className="form-cntnr">
        <Input
          type="text"
          value={username}
          setValue={setUsername}
          onKeyPress={handleKeypress}
          placeholder="Username"
          required
        />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          onKeyPress={handleKeypress}
          placeholder="Password"
          required
        />
        <br />
        <br />
        <Button text={'Log In'} onClick={handleSubmit} className="submit-btn" />
      </div>
      <h3 className="errorMsg">{error}</h3>
      
    </div>
  );
}

export default SignIn;
