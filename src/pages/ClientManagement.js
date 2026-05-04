import React, { useContext, useState } from "react";
import { CRMContext } from "../context/CRMContext";
import { addDays } from "date-fns";

const ClientManagement = () => {
  const { clients, addClient, deleteClient } = useContext(CRMContext);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    totalSpent: 0
  });

  const filteredClients = clients.filter((client) =>
    `${client.name} ${client.destination}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const newClient = {
      ...form,
      id: `CL-${Math.floor(Math.random() * 1000)}`,
      nextTrip: addDays(new Date(), 10),
      followUpDate: new Date(),
      totalSpent: Number(form.totalSpent)
    };
    addClient(newClient);
    setForm({ name: "", email: "", phone: "", destination: "", totalSpent: 0 });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h3>Client Management</h3>
        <input
          type="text"
          placeholder="Search clients"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="grid two">
        <form className="card" onSubmit={handleSubmit}>
          <h4>Add New Client</h4>
          <label>Name</label>
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
          <label>Phone</label>
          <input
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            required
          />
          <label>Destination</label>
          <input
            value={form.destination}
            onChange={(event) => setForm({ ...form, destination: event.target.value })}
            required
          />
          <label>Total Spent</label>
          <input
            type="number"
            value={form.totalSpent}
            onChange={(event) => setForm({ ...form, totalSpent: event.target.value })}
          />
          <button type="submit" className="primary">Add Client</button>
        </form>

        <div className="card">
          <h4>Clients</h4>
          <div className="list">
            {filteredClients.map((client) => (
              <div key={client.id} className="list-item">
                <div>
                  <strong>{client.name}</strong>
                  <p>{client.destination} · {client.phone}</p>
                </div>
                <button className="ghost" onClick={() => deleteClient(client.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
