import React, { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const facilityTypes = ['toilet', 'handwashing station', 'water point'];
const statusOptions = ['working', 'needs maintenance', 'out of order'];

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'toilet', location: '', status: 'working', lastInspected: '' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const fetchFacilities = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/facilities');
      setFacilities(res.data);
    } catch (err) {
      setError('Failed to fetch facilities');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddFacility = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      await api.post('/facilities', form);
      setShowForm(false);
      setForm({ name: '', type: 'toilet', location: '', status: 'working', lastInspected: '' });
      fetchFacilities();
    } catch (err) {
      setFormError('Failed to add facility');
    }
    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this facility?')) return;
    setError('');
    try {
      await api.delete(`/facilities/${id}`);
      fetchFacilities();
    } catch (err) {
      setError('Failed to delete facility');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 py-10 px-2 md:px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-teal-100 hover:bg-teal-200 text-teal-700 font-bold py-2 px-4 rounded-lg shadow-sm transition"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-teal-700 text-center drop-shadow">Manage Facilities</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
        >
          + Add Facility
        </button>
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading facilities...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : facilities.length === 0 ? (
          <div className="text-gray-500 text-center">No facilities found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Last Inspected</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {facilities.map((f) => (
                  <tr key={f._id} className="hover:bg-teal-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{f.name}</td>
                    <td className="px-4 py-3 capitalize">{f.type}</td>
                    <td className="px-4 py-3">{f.location}</td>
                    <td className="px-4 py-3 capitalize">{f.status}</td>
                    <td className="px-4 py-3">{f.lastInspected ? new Date(f.lastInspected).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => alert('Edit coming soon!')}
                        className="px-3 py-1 rounded-lg text-xs font-bold shadow bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(f._id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold shadow bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Add Facility Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 text-2xl font-bold"
              >
                ×
              </button>
              <h3 className="text-xl font-bold text-teal-700 mb-4 text-center">Add Facility</h3>
              <form onSubmit={handleAddFacility} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Type:</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    {facilityTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Status:</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Last Inspected:</label>
                  <input
                    type="date"
                    name="lastInspected"
                    value={form.lastInspected}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                {formError && <div className="text-red-600 text-sm text-center">{formError}</div>}
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md"
                  disabled={formLoading}
                >
                  {formLoading ? 'Adding...' : 'Add Facility'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFacilities; 