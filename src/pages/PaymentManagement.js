import React, { useContext, useState } from "react";
import { CRMContext } from "../context/CRMContext";
import { addDays, format } from "date-fns";

const PaymentManagement = () => {
  const { payments, addPayment } = useContext(CRMContext);
  const [form, setForm] = useState({
    clientId: "CL-001",
    amount: 0,
    status: "Pending",
    method: "Bank Transfer"
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addPayment({
      ...form,
      id: `PM-${Math.floor(Math.random() * 999)}`,
      amount: Number(form.amount),
      dueDate: addDays(new Date(), 3)
    });
    setForm({ clientId: "CL-001", amount: 0, status: "Pending", method: "Bank Transfer" });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h3>Payment Management</h3>
        <p>Track payment status, due dates, and revenue.</p>
      </div>

      <div className="grid two">
        <form className="card" onSubmit={handleSubmit}>
          <h4>Add Payment</h4>
          <label>Client ID</label>
          <input value={form.clientId} onChange={(event) => setForm({ ...form, clientId: event.target.value })} />
          <label>Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={(event) => setForm({ ...form, amount: event.target.value })}
          />
          <label>Status</label>
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
            <option>Pending</option>
            <option>Completed</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>
          <label>Method</label>
          <select value={form.method} onChange={(event) => setForm({ ...form, method: event.target.value })}>
            <option>Bank Transfer</option>
            <option>Credit Card</option>
            <option>UPI</option>
            <option>Cash</option>
          </select>
          <button className="primary">Add Payment</button>
        </form>

        <div className="card">
          <h4>Payment Records</h4>
          <div className="list">
            {payments.map((payment) => (
              <div key={payment.id} className="list-item">
                <div>
                  <strong>{payment.id}</strong>
                  <p>{payment.method} · {payment.status}</p>
                </div>
                <span className="badge">Due {format(payment.dueDate, "dd MMM")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
