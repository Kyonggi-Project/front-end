import React from 'react';
import './Login.css';
import { useState } from 'react';
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValues);
    axios.post('http://localhost:8080/login', JSON.stringify(enteredValues), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => { console.log(res.data) })
    .catch(error => {
      alert("로그인에 실패했습니다.");
      console.error('데이터 전송 오류:', error);
    });
  }

  function handlelInputChange(identifier, value) {
    setEnteredValues(prevValues => ({
      ...prevValues,
      [identifier]: value
    }))
  }

  return (
    <div className='rectangle-1'>
      <div className='rectangle-2'>
        <h1 className="login-title">Login to your account</h1>
        <p className='option-text'>enter email and password</p>
        <form>
          <div>
            <input
              type="email"
              placeholder="email"
              className="input-field"
              onChange={(event) => handlelInputChange('email', event.target.value)}
              value={enteredValues.email}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              className="input-field"
              onChange={(event) => handlelInputChange('password', event.target.value)}
              value={enteredValues.password}
            />
          </div>
          <p className='additional-text'>Don't you have a account? <a href='/signup'>Sign up</a></p>
          <GoogleOAuthProvider clientId='{clientId}'>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
          </GoogleOAuthProvider>
          <button className="login-button" onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
}