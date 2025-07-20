import React, { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/reports');
        setReports(res.data);
      } catch (err) {
        setError('Failed to load reports');
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    setDeletingId(id);
    setError('');
    try {
      await api.delete(`/reports/${id}`);
      setReports(reports.filter(r => r._id !== id));
    } catch (err) {
      setError('Failed to delete report');
    }
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-100">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="absolute left-6 top-6 bg-teal-100 hover:bg-teal-200 text-teal-700 font-bold py-2 px-4 rounded-lg shadow-sm transition"
        >
          ← Back to Dashboard
        </button>
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center drop-shadow">All Reports</h2>
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading reports...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : reports.length === 0 ? (
          <div className="text-gray-500 text-center">No reports found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Facility</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Issue Type</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Reported By</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((r) => (
                  <tr key={r._id} className="hover:bg-teal-50 transition">
                    <td className="px-4 py-3">{r.facilityId?.name || r.facilityId || 'N/A'}</td>
                    <td className="px-4 py-3">{r.issueType}</td>
                    <td className="px-4 py-3 capitalize">{r.status}</td>
                    <td className="px-4 py-3">{r.date ? new Date(r.date).toLocaleDateString() : ''}</td>
                    <td className="px-4 py-3">{r.reportedBy?.name || r.reportedBy || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold shadow bg-red-100 text-red-700 hover:bg-red-200 transition"
                        disabled={deletingId === r._id}
                      >
                        {deletingId === r._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReports; 