import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import AdminUsers from './AdminUsers.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AuditLogs from './AuditLogs.jsx';
import StaffDashboard from './StaffDashboard.jsx';
import ManagerDashboard from './ManagerDashboard.jsx';
import ManagerReports from './ManagerReports.jsx';
import ManagerFacilities from './ManagerFacilities.jsx';
import SubmitReport from './SubmitReport.jsx';
import MyReports from './MyReports.jsx';
import ManageFacilities from './ManageFacilities.jsx';
import ViewReports from './ViewReports.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/reports" element={<ManagerReports />} />
        <Route path="/manager/facilities" element={<ManagerFacilities />} />
        <Route path="/reports/new" element={<SubmitReport />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/facilities" element={<ManageFacilities />} />
        <Route path="/reports" element={<ViewReports />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
