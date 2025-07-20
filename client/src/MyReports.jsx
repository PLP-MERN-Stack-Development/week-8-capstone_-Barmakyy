import React, { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/reports');
        setReports(res.data.filter(r => r.reportedBy && (r.reportedBy._id === user.id || r.reportedBy === user.id)));
      } catch (err) {
        setError('Failed to load reports');
      }
      setLoading(false);
    };
    fetchReports();
  }, [user.id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-100">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/staff/dashboard')}
            className="bg-teal-100 hover:bg-teal-200 text-teal-700 font-bold py-2 px-4 rounded-lg shadow-sm transition"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold text-teal-700 text-center">My Reports</h2>
        </div>
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading reports...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : reports.length === 0 ? (
          <div className="text-gray-500 text-center">No reports found.</div>
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
              {reports.map((r) => (
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
  );
};

export default MyReports; 