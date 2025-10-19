// src/components/Auth/ResetPassword.js
import React, { useState } from 'react';
import { resetPassword } from '../../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(token, { password });
    if (res.message) {
      alert('Password reset successful');
      navigate('/login');
    } else {
      alert(res.error || 'Failed to reset password');
    }
  };

  return (
    <form onSubmit={submit} className="form" style={{maxWidth:400, margin:'20px auto'}}>
      <h3>Set a New Password</h3>
      <label>New password</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Reset password</button>
    </form>
  );
}
