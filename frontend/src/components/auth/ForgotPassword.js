// src/components/Auth/ForgotPassword.js
import React, { useState } from 'react';
import { forgotPassword } from '../../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await forgotPassword({ email });
    setSent(true);
  };

  if (sent) return <div className="form" style={{maxWidth:400, margin:'20px auto'}}><p>If that email exists, a reset link was sent.</p></div>;

  return (
    <form onSubmit={submit} className="form" style={{maxWidth:400, margin:'20px auto'}}>
      <h3>Forgot Password</h3>
      <label>Email</label>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button type="submit">Send reset link</button>
    </form>
  );
}
