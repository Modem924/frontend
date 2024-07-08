// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === id && user.password === password);

    if (user) {
      alert('Login successful');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };



  
  return (
    <div className="login-container">
    <img src={`${process.env.PUBLIC_URL}/DSTJ_logo.png`} alt="Logo" className="logo" />
    <h2>Login</h2>
    <form>
      <div className="input-group">
        {/*<label htmlFor="username">Username</label>*/}
        <input 
        type="text" 
        
        value={id}
        onChange={(e) => setId(e.target.value)}
        id="username" 
        name="username" 
        placeholder="ID" required /> 
      </div>
      <div className="input-group">
        {/*<label htmlFor="password">Password</label>*/}
        <input 
        type="password" 

        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password" 
        name="password" 
        placeholder="password" required />
      </div>

      <div className='button-group'>
      <button onClick={handleLogin}>Login</button>
      <button type="submit">Signup</button>
      </div>
    
    </form>
  </div>
    
  );
};

export default Login;
