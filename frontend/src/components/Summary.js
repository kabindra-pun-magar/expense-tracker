import React from 'react';

// Very simple summary: total income, total expense, balance
export default function Summary({ transactions }) {
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);
  const balance = income - expense;

  return (
    <div className="summary">
      <div className="card">
        <div className="label">Balance</div>
        <div className="value">{balance.toFixed(2)}</div>
      </div>
      <div className="card">
        <div className="label">Income</div>
        <div className="value">+{income.toFixed(2)}</div>
      </div>
      <div className="card">
        <div className="label">Expense</div>
        <div className="value">-{expense.toFixed(2)}</div>
      </div>
    </div>
  );
}
