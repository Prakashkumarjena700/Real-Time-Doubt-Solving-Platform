import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const url="http://localhost:4500/users/login";
  const navigate = useNavigate();

  const Login=async()=>{
    const loginData={
      email,
      password,
    };

    try{
      const response = await axios.post(url, loginData);

      if(response.data.success){
        localStorage.setItem('user-details',JSON.stringify(response.data.user[0]))
        localStorage.setItem('user-token',JSON.stringify(response.data.token))
        alert('Login Success')
        navigate('/dashboard')
      }else{
        alert('Please correct email and password')
      }
      console.log(response.data);
    }catch(err){
      console.error('Error during registration:', err);
      alert('Something went wrong')
    }

  }

  return (
    <div>
      <div>
        <div>
          <label >Email</label>
          <input type="email" placeholder='Enter email..' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <label >Password</label>
          <input type="test" placeholder='Enter password..' onChange={(e)=>setPassword(e.target.value)} />
        </div>
      </div>  

      <button onClick={Login} >Login</button>

    </div>
  )
}
