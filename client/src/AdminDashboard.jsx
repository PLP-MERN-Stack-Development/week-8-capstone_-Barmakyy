import React, { useEffect, useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const [facilitiesRes, usersRes, reportsRes, logsRes] = await Promise.all([
          api.get('/facilities'),
          api.get('/users'),
          api.get('/reports'),
          api.get('/audit-logs'),
        ]);
        setStats({
          facilities: facilitiesRes.data.length,
          users: usersRes.data.length,
          reports: reportsRes.data.length,
          admins: usersRes.data.filter(u => u.role === 'admin').length,
          managers: usersRes.data.filter(u => u.role === 'manager').length,
          staff: usersRes.data.filter(u => u.role === 'staff').length,
        });
        setRecentReports(reportsRes.data.slice(-5).reverse());
        setRecentLogs(logsRes.data.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data');
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 py-10 px-2 md:px-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold text-teal-700 mb-4 md:mb-0 text-center drop-shadow">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading dashboard...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-gradient-to-br from-teal-100 to-blue-50 rounded-2xl shadow p-6 text-center">
                <div className="text-3xl font-extrabold text-teal-700">{stats.facilities}</div>
                <div className="text-gray-600 mt-1">Facilities</div>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-blue-50 rounded-2xl shadow p-6 text-center">
                <div className="text-3xl font-extrabold text-teal-700">{stats.users}</div>
                <div className="text-gray-600 mt-1">Users</div>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-blue-50 rounded-2xl shadow p-6 text-center">
                <div className="text-3xl font-extrabold text-teal-700">{stats.reports}</div>
                <div className="text-gray-600 mt-1">Reports</div>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-blue-50 rounded-2xl shadow p-6 text-center flex flex-col items-center justify-center">
                <div className="text-lg text-teal-700 font-bold">Admins: {stats.admins}</div>
                <div className="text-lg text-teal-700 font-bold">Managers: {stats.managers}</div>
                <div className="text-lg text-teal-700 font-bold">Staff: {stats.staff}</div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Link to="/admin/users" className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-lg p-6 text-center font-bold text-lg transition duration-200 transform hover:scale-105">Manage Users</Link>
              <Link to="/facilities" className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-lg p-6 text-center font-bold text-lg transition duration-200 transform hover:scale-105">Manage Facilities</Link>
              <Link to="/reports" className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-lg p-6 text-center font-bold text-lg transition duration-200 transform hover:scale-105">View Reports</Link>
              <Link to="/admin/audit-logs" className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-lg p-6 text-center font-bold text-lg transition duration-200 transform hover:scale-105">Audit Logs</Link>
            </div>
            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold text-teal-700 mb-4">Recent Reports</h2>
                <div className="bg-gradient-to-br from-blue-50 to-teal-100 rounded-2xl shadow p-4">
                  {recentReports.length === 0 ? (
                    <div className="text-gray-500 text-center">No recent reports.</div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {recentReports.map((r) => (
                        <li key={r._id} className="py-3 px-2">
                          <span className="font-semibold text-teal-700">{r.issueType}</span> - {r.status} <br />
                          <span className="text-gray-600 text-sm">{r.date ? new Date(r.date).toLocaleString() : ''}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-teal-700 mb-4">Recent Audit Logs</h2>
                <div className="bg-gradient-to-br from-blue-50 to-teal-100 rounded-2xl shadow p-4">
                  {recentLogs.length === 0 ? (
                    <div className="text-gray-500 text-center">No recent activity.</div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {recentLogs.map((log) => (
                        <li key={log._id} className="py-3 px-2">
                          <span className="font-semibold text-teal-700">{log.action}</span> {log.targetType} <br />
                          <span className="text-gray-600 text-sm">By {log.user?.name || 'Unknown'} on {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 