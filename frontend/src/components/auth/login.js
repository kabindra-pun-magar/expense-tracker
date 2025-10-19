// src/components/Auth/Login.js
import React, { useState } from 'react';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      onLogin(res.user);
      navigate('/');
    } else {
      alert(res.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="form" style={{maxWidth:400, margin:'20px auto'}}>
      <h3>Login</h3>
      <label>Email</label>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <label>Password</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
