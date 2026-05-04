import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClientManagement from "./pages/ClientManagement";
import QuotationBuilder from "./pages/QuotationBuilder";
import HotelManagement from "./pages/HotelManagement";
import PaymentManagement from "./pages/PaymentManagement";
import Settings from "./pages/Settings";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/clients", label: "Clients" },
  { to: "/quotations", label: "Quotation Builder" },
  { to: "/hotels", label: "Hotels" },
  { to: "/payments", label: "Payments" },
  { to: "/settings", label: "Settings" }
];

const App = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-badge">VT</div>
          <div>
            <h1>Varino Travels</h1>
            <span>Advanced CRM</span>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Automation Ready</p>
          <small>v1.0.0</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>Varino Travels CRM</h2>
            <p>Manage clients, trips, quotations, and automation in one place.</p>
          </div>
          <button
            className="primary"
            onClick={() =>
              window.electronAPI?.notify({
                title: "Varino Travels CRM",
                body: "Automation is running. Daily follow-ups ready!"
              })
            }
          >
            Test Notification
          </button>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<ClientManagement />} />
          <Route path="/quotations" element={<QuotationBuilder />} />
          <Route path="/hotels" element={<HotelManagement />} />
          <Route path="/payments" element={<PaymentManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
