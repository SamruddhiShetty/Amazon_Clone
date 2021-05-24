import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth } from './firebase';

function Login() {
    const history=useHistory();//allows us to programaticaly change the url
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const signIn = e=>{
        e.preventDefault();

        //some fancy firebase login stuff
        auth.signInWithEmailAndPassword(email, password).then(auth=>{
            history.push('/')
        }).catch(error=>alert(error.message));

    }

    const register = e =>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then((auth)=>{
            //it successfully created a new user with email and password
            console.log(auth);
            if (auth){
                history.push('/')
            }
        }).catch(error=>alert(error.message))

        //do some fancy firebase register
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="Amazon_logo"/>
            </Link>

            <div className='login__container'>
                <h1>Sign in</h1>
                <form>
                    <h5>Email</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type="submit" onClick={signIn} className="login__signinButton">Sign In</button>
                </form>
                <p>
                    By signing-in you agree to Amazon Fake CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notices and our Internet-Based Ads Notice.
                </p>

                <button onClick={register} className="login__registerButton">Create Your Amazon account</button>
            </div>
        </div>
    )
}

export default Login

