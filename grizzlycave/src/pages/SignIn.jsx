import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import '../designs/Auth.css';
import { AuthService } from '../services/auth';
import { HashLink as Link } from 'react-router-hash-link';
import { setItem } from '../helpers/localstorage';
import { useHistory } from 'react-router';
import useAuth from '../hooks/useAuth';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();

  const handleSubmit = async () => {
    setErrorMsg('');
    login(username, password);
  };

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
          placeholder="Username"
          required
        />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          required
        />
        <br />
        <br />
        <Button text={'Log In'} onClick={handleSubmit} className="submit-btn" />
      </div>
      <h3 className="errorMsg">{errorMsg}</h3>
    </div>
  );
}

export default SignIn;
