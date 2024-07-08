import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
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

  const styles = {
    body: {
      backgroundColor: '#DDE1E6',
      margin: 0,
      fontFamily: 'Arial, sans-serif',
    },
    loginContainer: {
      width: '300px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#DDE1E6',
      textAlign: 'center',
    },
    logo: {
      width: '100px',
      marginBottom: '20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    input: {
      width: 'calc(100% - 10px)',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '3px',
    },
    buttonGroup: {
      marginTop: '20px',
    },
    button: {
      width: '100%',
      padding: '8px',
      border: 'none',
      borderRadius: '3px',
      backgroundColor: '#6890cb',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '10px',
    },
    buttonHover: {
      backgroundColor: '#697077',
    },
  };

  return React.createElement(
    'div',
    { style: styles.loginContainer },
    React.createElement('img', {
      src: `${process.env.PUBLIC_URL}/DSTJ_logo.png`,
      alt: 'Logo',
      style: styles.logo,
    }),
    React.createElement('h2', { style: styles.heading }, 'Login'),
    React.createElement(
      'form',
      null,
      React.createElement(
        'div',
        { style: styles.inputGroup },
        React.createElement('input', {
          type: 'text',
          value: id,
          onChange: (e) => setId(e.target.value),
          id: 'username',
          name: 'username',
          placeholder: 'ID',
          required: true,
          style: styles.input,
        })
      ),
      React.createElement(
        'div',
        { style: styles.inputGroup },
        React.createElement('input', {
          type: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          id: 'password',
          name: 'password',
          placeholder: 'password',
          required: true,
          style: styles.input,
        })
      ),
      React.createElement(
        'div',
        { style: styles.buttonGroup },
        React.createElement(
          'button',
          {
            onClick: handleLogin,
            style: styles.button,
            onMouseOver: (e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor,
            onMouseOut: (e) => e.target.style.backgroundColor = styles.button.backgroundColor,
          },
          'Login'
        ),
        React.createElement(
          'button',
          {
            type: 'submit',
            style: styles.button,
            onMouseOver: (e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor,
            onMouseOut: (e) => e.target.style.backgroundColor = styles.button.backgroundColor,
          },
          'Signup'
        )
      )
    )
  );
};

export default LoginScreen;
