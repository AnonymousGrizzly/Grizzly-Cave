import React from 'react'
import "../designs/SignUp.css";


function SignUp() {
    //sam za sprobavanje
    const valid=true;
    const isSignedIn = false;
    //konec sam za sprobavanje (kle se začne ta prav shit)


    function validateEmail(signup_email){ //Must contain @, can't be shorter than 8 characters
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(signup_email);
      }
    function validatePassword(signup_password){ //  Must contain 8 characters, 1 number, 1 letter and 1 unique character (!#$%/?-.;,:)
        const re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
        re.test(signup_password);
    }
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
   

    return (
        <div className="form-cntnr">
            <div className="title-cntnr">
                <h1> You are about to enter <br/><b>GrizzlyCave</b> </h1><br/>
                <p>- please provide the necessary information to get inside -</p>
                <p>Toggle:</p><button onclick="">SignUp</button>
            </div>  
            {!isSignedIn && (
                <form className="signup-cntnr">
                    <input type="text" name="signup_name" id="signup_name" placeholder="Username" required/>
                    <br/> <span>Must be unique</span>
                    <input type="email" name="signup_email" id="signup_email" placeholder="Email" required/>
                    <br/><span>Must be valid email</span>
                    <input type="password" name="repassword" id="repassword" placeholder="Password" required/>
                    <br/><span>Must contain at least 8 characters</span>
                    <input type="password" name="signup_password" id="signup_password" placeholder="Retype Password" required/>
                    <br/><span>Must be same as password</span>
                    {valid && (<input data-aos="fade-up" type="submit" value="SignUp"  className="submit-btn"/>)}
                </form>
            )}
            {isSignedIn && (
                <form className="signin-cntnr">
                    <input type="username" name="username" id="username" placeholder="Username" requred/>
                    <input type="password" name="password" id="password" placeholder="Password" required/>
                    <input type="submit" value="submit" className="submit-btn"/>
                </form>
            )}
            {emptymsg && (
                <p className="errormsg">{errormsg}</p>
            )}
        </div>
    )
}

export default SignUp;
