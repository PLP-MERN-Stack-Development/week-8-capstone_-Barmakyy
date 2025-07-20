import React, { useEffect, useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';

const ManagerReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/reports');
      setReports(response.data);
    } catch (err) {
      setError('Failed to load reports');
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await api.put(`/reports/${reportId}/status`, { status: newStatus });
      fetchReports(); // Refresh the list
    } catch (err) {
      setError('Failed to update report status');
    }
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-10 px-2 md:px-6">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Link
            to="/manager/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2 font-semibold transition duration-200"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-indigo-700 text-center drop-shadow">Manager Reports</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex gap-4 mb-4 md:mb-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="all">All Reports</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="flex gap-4">
            <Link
              to="/reports/new"
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-2 font-semibold transition duration-200"
            >
              + Submit Report
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading reports...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow p-6">
            {filteredReports.length === 0 ? (
              <div className="text-gray-500 text-center">No reports found.</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Facility</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Issue Type</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Reported By</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredReports.map((report) => (
                    <tr key={report._id}>
                      <td className="px-4 py-2">{report.facilityId?.name || report.facilityId || 'N/A'}</td>
                      <td className="px-4 py-2">{report.issueType}</td>
                      <td className="px-4 py-2 max-w-xs truncate">{report.description}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          report.status === 'open' ? 'bg-red-100 text-red-800' :
                          report.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{report.reportedBy?.name || report.reportedBy || 'N/A'}</td>
                      <td className="px-4 py-2">{report.date ? new Date(report.date).toLocaleDateString() : ''}</td>
                      <td className="px-4 py-2">
                        <select
                          value={report.status}
                          onChange={(e) => handleStatusUpdate(report._id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400"
                        >
                          <option value="open">Open</option>
                          <option value="in progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
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

export default ManagerReports; 