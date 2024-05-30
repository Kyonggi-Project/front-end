import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    username: "",
    password: "",
  });
  const url = process.env.REACT_APP_URL_PATH;

  const formData = new FormData();
  formData.append("username", enteredValues.username);
  formData.append("password", enteredValues.password);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post(url + '/login', formData, { withCredentials: true })
      .then((res) => {
        alert("로그인");
        window.location.href = res.data.redirectUrl;
      })
      .catch(error => {
        alert("로그인에 실패했습니다.");
        console.error('데이터 전송 오류:', error);
      });
  }

  function handlelInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value
    }));
  }

  return (
    <section className="login-form">
      <div>
        <h1 className="login-title">Login to your account</h1>
        <p className='login-option'>enter email and password</p>
        <form>
          <div>
            <input
              type="username"
              placeholder="username"
              className="login-input-box"
              onChange={(event) => handlelInputChange('username', event.target.value)}
              value={enteredValues.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              className="login-input-box"
              onChange={(event) => handlelInputChange('password', event.target.value)}
              value={enteredValues.password}
            />
          </div>
          <p className='login-a-text'>Don't you have a account? <Link to="/signup" className="signup-link">Sign up</Link></p>
          <a href={process.env.REACT_APP_GOOGLE_OAUTH}>
            <img src="../google.png" width="30px" alt="google"></img>
          </a>
          <button className="login-button" onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </section>
  );
}
