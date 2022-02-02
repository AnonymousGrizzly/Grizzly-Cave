import React, {useEffect, useState} from 'react'
import Button from '../components/Button';
import Input from '../components/Input';
import "../designs/SignUp.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(""); 

    function validateEmail(signup_email){ //Must contain @, can't be shorter than 8 characters
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(signup_email);
    }
    function validatePassword(signup_password){ //  Must contain 8 characters, 1 number, 1 letter and 1 unique character (!#$%/?-.;,:)
        const re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
        return re.test(signup_password);
    }
    /*
    const signup_email = document.getElementById("signup_email"), signup_password = document.getElementById("signup_password"), signup_repassword = document.getElementById("repassword");
    //const valid = !!(validateEmail(signup_email) && validatePassword(signup_password) && signup_password == signup_repassword);
    let errormsg="0", emptymsg=!!(errormsg!=="0"); 
     
    if(!valid){  //to ne zgleda da bi delal
        if(!validatePassword(signup_password)){
            errormsg = "Password must contain at least 8 characters, 1 number, 1 letter & 1 unique character (!#$%/?...)";
        }else if(!validateEmail(signup_email)){
            errormsg = "Must be a valid email!";
        }else if(signup_password !== signup_repassword){
            errormsg = "Passwords must be the same!"
        }
    }
   */

    const handleSubmit = () => {
        setErrorMsg("");

        

        const isEmailValid = validateEmail(email);

        if (!isEmailValid) {
            return setErrorMsg("Must be a valid email!");
        }

        const isPasswordValid = validatePassword(password);

        if (!isPasswordValid) {
            return setErrorMsg("Password must contain at least 8 characters, 1 number, 1 letter & 1 unique character (!#$%/?...)");
        }

        if (password != repassword) {
            return setErrorMsg("Passwords must be the same!");
        }
    };

    return (
        <div className="form-cntnr">
            <Input type="text" value={username} setValue={setUsername} placeholder="Username" required/>
            <Input type="text" value={email} setValue={setEmail} placeholder="Email" required />
            <Input type="password" value={password} setValue={setPassword} placeholder="Password" required />
            <Input type="password" value={repassword} setValue={setRepassword} placeholder="Retype Password" required />
            <Button text={"Submit"} onClick={handleSubmit} className="submit-btn" />
            <p>{errorMsg}</p>
        </div>
    )
}

export default SignUp;
