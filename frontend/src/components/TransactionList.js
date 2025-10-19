import React from 'react';

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) return <p>No transactions yet.</p>;

  return (
    <div className="list">
      {transactions.map(t => (
        <div key={t._id} className={`item ${t.type}`}>
          <div className="left">
            <div className="amount">{t.type === 'expense' ? '-' : '+'}{t.amount.toFixed(2)}</div>
            <div className="meta">
              <span className="category">{t.category}</span> • <span className="date">{new Date(t.date).toLocaleDateString()}</span>
            </div>
            <div className="desc">{t.description}</div>
          </div>
          <div className="right">
            <button className="del" onClick={() => onDelete(t._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
