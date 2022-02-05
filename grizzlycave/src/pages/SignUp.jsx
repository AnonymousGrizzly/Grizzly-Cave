import React, {useState} from 'react'
import Button from '../components/Button';
import Input from '../components/Input';
import "../designs/Auth.css";
import { AuthService } from '../services/auth';
import {HashLink as Link} from 'react-router-hash-link';
import { useHistory } from 'react-router';
import { setItem } from '../helpers/localstorage';

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const history = useHistory(); 

    function validateEmail(signup_email){ //Must contain @, can't be shorter than 8 characters
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(signup_email);
    }
    function validatePassword(signup_password){ //  Must contain 8 characters, 1 number, 1 letter and 1 unique character (!#$%/?-.;,:)
        const re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
        return re.test(signup_password);
    }
    function validateUsername(username){ //Must be shorter than 20 characters, no spaces, no special characters
        const signup_username = username.length; 
        if(signup_username.length>20){
            return false;
        }
        const re = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-)[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
        return re.test(signup_username);
    }

    const handleSubmit = async () => {
        setErrorMsg("");

        /*const isUsernameValid = validateUsername(username);
        
        if(!isUsernameValid){
            return setErrorMsg("Must be a simple username without special characters!");
        }
        */
        const isEmailValid = validateEmail(email);

        if (!isEmailValid) {
            return setErrorMsg("Must be a valid email!");
        }

        const isPasswordValid = validatePassword(password);

        if (!isPasswordValid) {
            return setErrorMsg("Password must contain at least 8 characters, 1 number, 1 letter & 1 unique character (!#$%/?...)");
        }

        if (password !== repassword) {
            return setErrorMsg("Passwords must be the same!");
        }

        const response = await AuthService.createUser({
            username,
            email,
            password 
        });
        const parsedResponse = await response.json();
        setErrorMsg(parsedResponse.message);
        if (response.ok) {
            setItem("PHPTOKEN", parsedResponse.jwt);
            history.push("/profile");
        }
    };

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

export default SignUp;
