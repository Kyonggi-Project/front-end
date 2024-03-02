import React from 'react';
import './Login.css';

export default function Login(){
    return(
        <div className='rectangle-1'>
            <div className='rectangle-2'>
            <h1 className="login-title">Login to your account</h1>
            <p className='option-text'>enter email and password</p>
            <div>
                <input type="email" placeholder="email" className="input-field"/>
            </div>
            <div>
                <input type="password" placeholder="password" className="input-field"/>
            </div>
            <p className='additional-text'>Don't you have a account? <a href='/signup'>Sign up</a></p>
            <button className="login-button">Login</button>
            </div>
        </div>
    );
}