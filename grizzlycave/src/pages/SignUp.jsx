import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/Auth.css';
import { HashLink as Link } from 'react-router-hash-link';
import { LogIn } from 'react-feather';
import useAuth from '../hooks/useAuth';
import useKeyPress from '../hooks/useKeyPress';
import { validateEmail } from '../RegEx/validateEmail'
import { validatePassword } from '../RegEx/validatePassword'
import { validateUsername } from '../RegEx/validateUsername'
import { useEffect } from 'react';  

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { signUp, error } = useAuth();

  const isEnterPressed = useKeyPress('Enter');

  useEffect(() => {
    if (isEnterPressed === true) {
      handleSubmit();
    }
  }, [isEnterPressed]);

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

    if (password !== repassword) {
      return setErrorMsg('Passwords must be the same!');
    }

    signUp(username, email, password);
  };

  return (
    <div>
      <div className="title-cntnr">
        <h1>
          {' '}
          You are about to enter <br />
          <b> GrizzlyCave </b>{' '}
        </h1>
        <br />
        <p>- please provide the necessary information to get inside -</p>
        <br />
        <div className="btn-centered">
          <Link to="/signin" className="secondary-btn icon">
            Already have an account? Login &nbsp; <LogIn size="20" />
          </Link>
        </div>
      </div>
      <div className="form-cntnr">
        <Input
          type="text"
          value={username}
          setValue={setUsername}
          placeholder="Username"
          required
        />
        <br />
        <p className="spam">Must be unique</p>
        <Input
          type="text"
          value={email}
          setValue={setEmail}
          placeholder="Email"
          required
        />
        <br />
        <p className="spam">Must be valid email</p>
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          required
        />
        <p className="spam">Must be complex</p>
        <Input
          type="password"
          value={repassword}
          setValue={setRepassword}
          placeholder="Retype Password"
          required
        />
        <br />
        <p className="spam">Must be same as password</p>
        <br />
        <Button
          text={'Create User'}
          onClick={handleSubmit}
          className="submit-btn"
        />
      </div>
      <h3 className="errorMsg">{error || errorMsg}</h3>
    </div>
  );
}

export default SignUp;
