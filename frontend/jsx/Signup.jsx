// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';



const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.id === id);

    if (userExists) {
      alert('User already exists');
    } else {
      users.push({ id: id, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful');
      navigate('/login');
    }
  };

  return (
    <div className="signup-container">
      <img src={`${process.env.PUBLIC_URL}/DSTJ_logo.png`} alt="Logo" className="logo" />
      <h2>Sign up</h2>
      <form>
        <div className="input-group">
          {/*<label htmlFor="username">Username</label>*/}
        <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID"
        />
        </div>
        <div className="input-group">
          {/*<label htmlFor="password">Password</label>*/}
        <input
        type="password"//화면에 표시되지 않음
        value={password} //입력 필드의 현재 상태를 컴포넌트의 상태와 동기화함
        onChange={(e) => setPassword(e.target.value)} //이벤트 핸들러, e : 객체, setPassword함수를 호출
        placeholder="Password" //회색 텍스트가 표시
        />
        </div>
        <div className='button-group'>
        <button onClick={handleSignup}>Signup</button>
        <button type="submit">Login</button>
        </div>
      
      </form>
    </div>
  );
};

export default Signup;
