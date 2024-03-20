import React from 'react';
import './Login.css';
import { useState } from 'react';
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { redirect } from 'react-router-dom';

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    username: '',
    password: '',
  });

  const formData = new FormData();
  formData.append('username', enteredValues.username);
  formData.append('password', enteredValues.password);

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValues);
    axios.post('http://localhost:8080/login', formData)
    .then((res) => { 
      console.log(res.data); 
      alert("로그인");
      redirect("..");
    })
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
              type="username"
              placeholder="username"
              className="input-field"
              onChange={(event) => handlelInputChange('username', event.target.value)}
              value={enteredValues.username}
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