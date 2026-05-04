import React, { useContext } from "react";
import { CRMContext } from "../context/CRMContext";
import { format } from "date-fns";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const revenueData = [
  { name: "Jan", value: 220000 },
  { name: "Feb", value: 260000 },
  { name: "Mar", value: 310000 },
  { name: "Apr", value: 360000 },
  { name: "May", value: 420000 }
];

const Dashboard = () => {
  const { clients, payments, upcomingTrips, todaysFollowUps, totalRevenue } = useContext(CRMContext);

  const pendingPayments = payments.filter((payment) => payment.status === "Pending");

  return (
    <div className="page">
      <section className="grid stats">
        <div className="card">
          <h3>Total Clients</h3>
          <p className="stat">{clients.length}</p>
        </div>
        <div className="card">
          <h3>Active Trips</h3>
          <p className="stat">{upcomingTrips.length}</p>
        </div>
        <div className="card">
          <h3>Revenue</h3>
          <p className="stat">₹{totalRevenue.toLocaleString("en-IN")}</p>
        </div>
        <div className="card">
          <h3>Pending Payments</h3>
          <p className="stat">{pendingPayments.length}</p>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <h3>Revenue Trend</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3>Today's Follow-ups</h3>
          <div className="list">
            {todaysFollowUps.length === 0 && <p>No follow-ups scheduled today.</p>}
            {todaysFollowUps.map((client) => (
              <div key={client.id} className="list-item">
                <div>
                  <strong>{client.name}</strong>
                  <p>{client.destination}</p>
                </div>
                <span className="badge">Today</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <h3>Upcoming Trips (Next 7 Days)</h3>
          <div className="list">
            {upcomingTrips.length === 0 && <p>No upcoming trips this week.</p>}
            {upcomingTrips.map((client) => (
              <div key={client.id} className="list-item">
                <div>
                  <strong>{client.name}</strong>
                  <p>{client.destination}</p>
                </div>
                <span className="badge">
                  {client.nextTrip ? format(client.nextTrip, "dd MMM") : "-"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Pending Payments</h3>
          <div className="list">
            {pendingPayments.map((payment) => (
              <div key={payment.id} className="list-item">
                <div>
                  <strong>{payment.id}</strong>
                  <p>{payment.method}</p>
                </div>
                <span className="badge">₹{payment.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
