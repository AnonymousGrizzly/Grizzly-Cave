import React, {useState} from 'react'
import Button from '../components/Button';
import Input from '../components/Input';
import "../designs/Auth.css";
import { AuthService } from '../services/auth';
import {HashLink as Link} from 'react-router-hash-link';

function SignIn() {
  const 

  return (
    <div>
      <div className='title-cntnr'>
                <h1> You are about to enter <br/><b>GrizzlyCave</b> </h1><br/>
                <p>- please provide the necessary information to get inside -</p><br/>
                <Link smooth to="/signin" className="secondary-btn" > Already have an account? Login <i class="fas fa-sign-in-alt"></i></Link>
            </div>
        <div className="form-cntnr">
            <Input type="text" value={username} setValue={setUsername} placeholder="Username" required/>
            <br/><p className='spam'>Must be unique</p>
            <Input type="text" value={email} setValue={setEmail} placeholder="Email" required />
            <br/><p className='spam'>Must be valid email</p>
            <Input type="password" value={password} setValue={setPassword} placeholder="Password" required />
            <p className='spam'>Must be complex</p>
            <Input type="password" value={repassword} setValue={setRepassword} placeholder="Retype Password" required />
            <br/><p className='spam'>Must be same as password</p>
            <br/>
            <Button text={"Create User"} onClick={handleSubmit} className="submit-btn" />
            
        </div>
        <h3 className='errorMsg'>{errorMsg}</h3>
    </div>
  )
}

export default SignIn;
