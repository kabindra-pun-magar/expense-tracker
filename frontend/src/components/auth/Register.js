// src/components/Auth/Register.js
import React, { useState } from 'react';
import { register } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await register({ email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      onRegister(res.user);
      navigate('/');
    } else {
      alert(res.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={submit} className="form" style={{maxWidth:400, margin:'20px auto'}}>
      <h3>Register</h3>
      <label>Email</label>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <label>Password</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}
