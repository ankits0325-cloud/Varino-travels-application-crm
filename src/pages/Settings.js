import React from "react";

const Settings = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h3>Settings & Integrations</h3>
        <p>Configure notifications, Google Sheets, and company details.</p>
      </div>

      <div className="grid two">
        <div className="card">
          <h4>Company Information</h4>
          <label>Company Name</label>
          <input defaultValue={process.env.REACT_APP_COMPANY_NAME || "Varino Travels"} />
          <label>Currency</label>
          <input defaultValue={process.env.REACT_APP_CURRENCY || "INR"} />
          <label>Tax Rate (%)</label>
          <input defaultValue={process.env.REACT_APP_TAX_RATE || 10} />
          <button className="primary">Save Settings</button>
        </div>

        <div className="card">
          <h4>Automation & Integrations</h4>
          <label>Google API Key</label>
          <input placeholder="Enter Google Sheets API Key" />
          <label>Twilio Account SID</label>
          <input placeholder="Enter Twilio SID" />
          <label>Notification Mode</label>
          <select>
            <option>Email + SMS</option>
            <option>Email Only</option>
            <option>SMS Only</option>
          </select>
          <button className="primary">Update Integrations</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
