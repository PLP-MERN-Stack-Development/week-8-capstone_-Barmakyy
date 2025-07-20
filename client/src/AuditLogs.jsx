import React, { useEffect, useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';

const AuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/audit-logs');
      setAuditLogs(response.data);
    } catch (err) {
      setError('Failed to load audit logs');
    }
    setLoading(false);
  };

  const filteredLogs = auditLogs.filter(log => {
    if (filter === 'all') return true;
    return log.action === filter;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'create': return 'bg-green-100 text-green-800';
      case 'update': return 'bg-blue-100 text-blue-800';
      case 'delete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 py-10 px-2 md:px-6">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <Link
              to="/admin/dashboard"
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-2 font-semibold transition duration-200"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-teal-700 text-center drop-shadow">Audit Logs</h1>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-gray-600">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex gap-4 mb-4 md:mb-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="all">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading audit logs...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-teal-100 rounded-2xl shadow p-6">
            {filteredLogs.length === 0 ? (
              <div className="text-gray-500 text-center">No audit logs found.</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Timestamp</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">User</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Action</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Target Type</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Target ID</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLogs.map((log) => (
                    <tr key={log._id}>
                      <td className="px-4 py-2 text-sm">{formatTimestamp(log.timestamp)}</td>
                      <td className="px-4 py-2 text-sm">{log.user?.name || log.user || 'Unknown'}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">{log.targetType}</td>
                      <td className="px-4 py-2 text-sm font-mono text-gray-600">{log.targetId}</td>
                      <td className="px-4 py-2 text-sm">
                        <details className="cursor-pointer">
                          <summary className="text-teal-600 hover:text-teal-800">View Details</summary>
                          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-w-xs">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs; 