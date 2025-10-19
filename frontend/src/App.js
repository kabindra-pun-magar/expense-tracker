// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './components/auth/login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import { fetchTransactions, createTransaction, deleteTransaction, getMe } from './api';

function Home({ onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const addTransaction = async (trx) => {
    const created = await createTransaction(trx);
    if (created) setTransactions(prev => [created, ...prev]);
  };

  const removeTransaction = async (id) => {
    const ok = await deleteTransaction(id);
    if (ok) setTransactions(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="container">
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Expense Tracker Pro</h1>
        <button onClick={onLogout}>Logout</button>
      </header>

      <div className="top">
        <Summary transactions={transactions} />
        <TransactionForm onAdd={addTransaction} />
      </div>

      <h2>Transactions</h2>
      {loading ? <p>Loading...</p> : <TransactionList transactions={transactions} onDelete={removeTransaction} />}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const me = await getMe();
      setUser(me);
      setChecking(false);
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (checking) return <p>Checking authentication...</p>;

  return (
    <BrowserRouter>
      <nav style={{padding:'8px', textAlign:'center'}}>
        {!user ? (
          <>
            <Link to="/login" style={{marginRight:10}}>Login</Link>
            <Link to="/register" style={{marginRight:10}}>Register</Link>
            <Link to="/forgot-password">Forgot Password</Link>
          </>
        ) : (
          <Link to="/">Home</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={user ? <Home onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onRegister={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
