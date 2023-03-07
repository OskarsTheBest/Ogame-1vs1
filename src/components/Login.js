import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";
import '../App.css';

function Login({ setIsAuth }) {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {

    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });

  };

  return (
    <div className='login'>
      <label className='login__label'>Login</label>

      <input className='login__input' placeholder='Username' onChange={(event) => {
        setUsername(event.target.value);
      }} />

      <input className='login__input' placeholder='Password' onChange={(event) => {
        setPassword(event.target.value);
      }} />

      <button className='login__button' onClick={login}>Login</button>
    </div>
  );
}

export default Login;
