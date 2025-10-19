import React, { useState } from 'react';

// Simple form to add income/expense
export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!type || isNaN(amt)) {
      alert('Please select type and valid amount.');
      return;
    }
    onAdd({
      type,
      amount: amt,
      category,
      description,
      date: date || undefined
    });
    // clear
    setAmount('');
    setCategory('');
    setDescription('');
    setDate('');
  };

  return (
    <form className="form" onSubmit={submit}>
      <h3>Add Transaction</h3>

      <label>Type</label>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <label>Amount</label>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} step="0.01" />

      <label>Category</label>
      <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Food, Salary" />

      <label>Description</label>
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="optional" />

      <label>Date</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <button type="submit">Add</button>
    </form>
  );
}
