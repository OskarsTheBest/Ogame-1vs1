import React, {useState} from 'react'
import Axios from "axios";
import Cookies from "universal-cookie"
import '../App.css';

function SignUp({setIsAuth}) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null)

    // Function to sign up a new user
    const signUp = ( ) => {
        Axios.post("http://localhost:3001/signup", user).then((res) => {
            // Extracting user data from the response
            const { token, userId, firstName, lastName, username, hashedPassword} = res.data;
            // Setting user data in cookies for future use
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("lastName", lastName);
            cookies.set("firstName", firstName);   
            cookies.set("hashedPassword", hashedPassword);
            // Setting authentication status to true
            setIsAuth(true);
        });
    };
  return (
    <div className='signup'>
        <label className='signup__label' >Sign Up</label>
                    {/* Input fields to get user details */}
        <input className='signup__input'  placeholder='First Name' onChange={(event) =>{
            setUser({ ...user, firstName: event.target.value});
        }}></input>
        <input className='signup__input' placeholder='Last Name' onChange={(event) =>{
            setUser({ ...user, lastName: event.target.value});
        }}></input>
        <input className='signup__input' placeholder='Username' onChange={(event) =>{
            setUser({ ...user, username: event.target.value});
        }}></input>
        <input className='signup__input' placeholder='Password' onChange={(event) =>{
            setUser({ ...user, password: event.target.value});
        }}></input>
        <button className='signup__button' onClick={signUp}>Sign Up</button>
    </div>
  )
}

export default SignUp
