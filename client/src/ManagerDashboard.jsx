import React, { useEffect, useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
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
        const [facilitiesRes, reportsRes, usersRes] = await Promise.all([
          api.get('/facilities'),
          api.get('/reports'),
          api.get('/users'),
        ]);
        setFacilities(facilitiesRes.data);
        setReports(reportsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const openReports = reports.filter(r => r.status === 'open');
  const resolvedReports = reports.filter(r => r.status === 'resolved');
  const pendingReports = reports.filter(r => r.status === 'pending');
  const recentReports = reports.slice(-5).reverse();
  const workingFacilities = facilities.filter(f => f.status === 'Working');
  const maintenanceFacilities = facilities.filter(f => f.status === 'Needs Maintenance');
  const staffCount = users.length;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-10 px-2 md:px-6 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-4 md:mb-0 drop-shadow">Manager Dashboard</h1>
          <div className="flex gap-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
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
              <Link to="/manager/facilities" className="block px-4 py-2 hover:bg-teal-100" onClick={() => setMenuOpen(false)}>Manage Facilities</Link>
              <Link to="/manager/reports" className="block px-4 py-2 hover:bg-teal-100" onClick={() => setMenuOpen(false)}>View All Reports</Link>
              <Link to="/reports/new" className="block px-4 py-2 hover:bg-teal-100" onClick={() => setMenuOpen(false)}>Submit Report</Link>
            </div>
          )}
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 mb-10 justify-center">
          <Link
            to="/manager/facilities"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg px-8 py-3 font-bold text-lg transition duration-200 transform hover:scale-105 text-center"
          >
            Manage Facilities
          </Link>
          <Link
            to="/manager/reports"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg px-8 py-3 font-bold text-lg transition duration-200 transform hover:scale-105 text-center"
          >
            View All Reports
          </Link>
          <Link
            to="/reports/new"
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg px-8 py-3 font-bold text-lg transition duration-200 transform hover:scale-105 text-center"
          >
            Submit Report
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading dashboard...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-50 rounded-2xl shadow p-6 text-center">
                <div className="text-2xl font-extrabold text-indigo-700">{facilities.length}</div>
                <div className="text-gray-600 mt-1">Total Facilities</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 rounded-2xl shadow p-6 text-center">
                <div className="text-2xl font-extrabold text-green-700">{workingFacilities.length}</div>
                <div className="text-gray-600 mt-1">Working Facilities</div>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl shadow p-6 text-center">
                <div className="text-2xl font-extrabold text-orange-700">{maintenanceFacilities.length}</div>
                <div className="text-gray-600 mt-1">Need Maintenance</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-2xl shadow p-6 text-center">
                <div className="text-2xl font-extrabold text-blue-700">{staffCount}</div>
                <div className="text-gray-600 mt-1">Staff Members</div>
              </div>
            </div>

            {/* Report Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-100 to-pink-50 rounded-2xl shadow p-6 text-center">
                <div className="text-2xl font-extrabold text-red-700">{openReports.length}</div>
                <div className="text-gray-600 mt-1">Open Reports</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-orange-50 rounded-2xl shadow p-6 text-center">
                <div className="text-2xl font-extrabold text-yellow-700">{pendingReports.length}</div>
                <div className="text-gray-600 mt-1">Pending Reports</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 rounded-2xl shadow p-6 text-center">
                <div className="text-2xl font-extrabold text-green-700">{resolvedReports.length}</div>
                <div className="text-gray-600 mt-1">Resolved Reports</div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Recent Reports</h2>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow p-4">
                {recentReports.length === 0 ? (
                  <div className="text-gray-500 text-center">No recent reports.</div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Facility</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Issue Type</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Reported By</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentReports.map((r) => (
                        <tr key={r._id}>
                          <td className="px-4 py-2">{r.facilityId?.name || r.facilityId || 'N/A'}</td>
                          <td className="px-4 py-2">{r.issueType}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              r.status === 'open' ? 'bg-red-100 text-red-800' :
                              r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{r.reportedBy?.name || r.reportedBy || 'N/A'}</td>
                          <td className="px-4 py-2">{r.date ? new Date(r.date).toLocaleDateString() : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Facilities Overview */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Facilities Overview</h2>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow p-4">
                {facilities.length === 0 ? (
                  <div className="text-gray-500 text-center">No facilities found.</div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Location</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Last Inspected</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {facilities.slice(0, 5).map((f) => (
                        <tr key={f._id}>
                          <td className="px-4 py-2">{f.name}</td>
                          <td className="px-4 py-2 capitalize">{f.type}</td>
                          <td className="px-4 py-2">{f.location}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              f.status === 'Working' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {f.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{f.lastInspected ? new Date(f.lastInspected).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Staff Overview */}
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">Staff Overview</h2>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow p-4">
                {users.length === 0 ? (
                  <div className="text-gray-500 text-center">No staff members found.</div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.slice(0, 5).map((u) => (
                        <tr key={u._id}>
                          <td className="px-4 py-2">{u.name}</td>
                          <td className="px-4 py-2">{u.email}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              u.status === 'active' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard; 