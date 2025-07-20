import React, { useEffect, useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [facilitiesRes, reportsRes] = await Promise.all([
          api.get('/facilities'),
          api.get('/reports'),
        ]);
        setFacilities(facilitiesRes.data);
        setReports(reportsRes.data.filter(r => r.reportedBy && (r.reportedBy._id === user.id || r.reportedBy === user.id)));
      } catch (err) {
        setError('Failed to load dashboard data');
      }
      setLoading(false);
    };
    fetchData();
  }, [user.id]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const openReports = reports.filter(r => r.status === 'open');
  const resolvedReports = reports.filter(r => r.status === 'resolved');
  const recentReports = reports.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 py-10 px-2 md:px-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold text-teal-700 mb-4 md:mb-0 text-center drop-shadow">Staff Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Hamburger for dashboard links (mobile only) */}
        <div className="md:hidden mb-6 relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl p-2"
            aria-label="Open dashboard menu"
          >
            &#9776;
          </button>
          {menuOpen && (
            <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-30 right-0">
              <Link to="/reports/new" className="block px-4 py-2 hover:bg-teal-100" onClick={() => setMenuOpen(false)}>Submit New Report</Link>
              <Link to="/my-reports" className="block px-4 py-2 hover:bg-teal-100" onClick={() => setMenuOpen(false)}>View My Reports</Link>
            </div>
          )}
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 mb-10 justify-center">
          <Link
            to="/reports/new"
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg px-8 py-3 font-bold text-lg transition duration-200 transform hover:scale-105 text-center"
          >
            Submit New Report
          </Link>
          <Link
            to="/my-reports"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg px-8 py-3 font-bold text-lg transition duration-200 transform hover:scale-105 text-center"
          >
            View My Reports
          </Link>
        </div>

        {/* Recent Reports */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">Recent Reports</h2>
          <div className="bg-gradient-to-br from-blue-50 to-teal-100 rounded-2xl shadow p-4">
            {recentReports.length === 0 ? (
              <div className="text-gray-500 text-center">No recent reports.</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Facility</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Issue Type</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentReports.map((r) => (
                    <tr key={r._id}>
                      <td className="px-4 py-2">{r.facilityId?.name || r.facilityId || 'N/A'}</td>
                      <td className="px-4 py-2">{r.issueType}</td>
                      <td className="px-4 py-2 capitalize">{r.status}</td>
                      <td className="px-4 py-2">{r.date ? new Date(r.date).toLocaleDateString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* Facilities List */}
        <div>
          <h2 className="text-2xl font-bold text-teal-700 mb-4">Facilities List</h2>
          <div className="bg-gradient-to-br from-blue-50 to-teal-100 rounded-2xl shadow p-4">
            {facilities.length === 0 ? (
              <div className="text-gray-500 text-center">No facilities found.</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {facilities.map((f) => (
                    <tr key={f._id}>
                      <td className="px-4 py-2">{f.name}</td>
                      <td className="px-4 py-2 capitalize">{f.type}</td>
                      <td className="px-4 py-2 capitalize">{f.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard; 