import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const SubmitReport = () => {
  const [form, setForm] = useState({
    facilityId: '',
    issueType: '',
    description: '',
    images: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file) => formData.append('images', file));
        } else {
          formData.append(key, value);
        }
      });
      await api.post('/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Report submitted successfully!');
      setForm({ facilityId: '', issueType: '', description: '', images: [] });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report');
    }
    setLoading(false);
  };

  const handleBack = () => {
    if (!user || !user.role) return navigate('/');
    if (user.role === 'manager') return navigate('/manager/dashboard');
    if (user.role === 'staff') return navigate('/staff/dashboard');
    if (user.role === 'admin') return navigate('/admin/dashboard');
    return navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-700 mb-4 md:mb-0">Submit New Report</h2>
          <button
            onClick={handleBack}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
          >
            ← Back to Dashboard
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Facility ID:</label>
            <input
              type="text"
              name="facilityId"
              value={form.facilityId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Issue Type:</label>
            <select
              name="issueType"
              value={form.issueType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="">Select Issue</option>
              <option value="cleanliness">Cleanliness</option>
              <option value="broken">Broken</option>
              <option value="out of supplies">Out of Supplies</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Images:</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitReport; 