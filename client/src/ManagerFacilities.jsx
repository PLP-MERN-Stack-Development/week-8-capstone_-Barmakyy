import React, { useEffect, useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';

const ManagerFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFacility, setNewFacility] = useState({
    name: '',
    type: '',
    location: '',
    status: 'Working',
    lastInspected: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/facilities');
      setFacilities(response.data);
    } catch (err) {
      setError('Failed to load facilities');
    }
    setLoading(false);
  };

  const handleAddFacility = async (e) => {
    e.preventDefault();
    try {
      await api.post('/facilities', newFacility);
      setNewFacility({
        name: '',
        type: '',
        location: '',
        status: 'Working',
        lastInspected: ''
      });
      setShowAddForm(false);
      fetchFacilities();
    } catch (err) {
      setError('Failed to add facility');
    }
  };

  const handleDeleteFacility = async (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        await api.delete(`/facilities/${id}`);
        fetchFacilities();
      } catch (err) {
        setError('Failed to delete facility');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-10 px-2 md:px-6">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-4 md:mb-0 drop-shadow">Manager Facilities</h1>
          <div className="flex gap-4 items-center">
            <span className="text-gray-600">Welcome, Manager</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex gap-4">
            <Link
              to="/manager/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2 font-semibold transition duration-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-2 font-semibold transition duration-200"
            >
              + Add Facility
            </button>
          </div>
        </div>

        {/* Add Facility Form */}
        {showAddForm && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow p-6 mb-6">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Add New Facility</h3>
            <form onSubmit={handleAddFacility} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Facility Name"
                value={newFacility.name}
                onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={newFacility.type}
                onChange={(e) => setNewFacility({...newFacility, type: e.target.value})}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Type</option>
                <option value="Water Point">Water Point</option>
                <option value="Toilet">Toilet</option>
                <option value="Handwashing Station">Handwashing Station</option>
                <option value="Shower">Shower</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={newFacility.location}
                onChange={(e) => setNewFacility({...newFacility, location: e.target.value})}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={newFacility.status}
                onChange={(e) => setNewFacility({...newFacility, status: e.target.value})}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Working">Working</option>
                <option value="Needs Maintenance">Needs Maintenance</option>
                <option value="Out of Service">Out of Service</option>
              </select>
              <input
                type="date"
                value={newFacility.lastInspected}
                onChange={(e) => setNewFacility({...newFacility, lastInspected: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
                >
                  Add Facility
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-4 py-2 font-semibold transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading facilities...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow p-6">
            {facilities.length === 0 ? (
              <div className="text-gray-500 text-center">No facilities found.</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">NAME</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">TYPE</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">LOCATION</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">STATUS</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">LAST INSPECTED</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {facilities.map((facility) => (
                    <tr key={facility._id}>
                      <td className="px-4 py-2">{facility.name}</td>
                      <td className="px-4 py-2 capitalize">{facility.type}</td>
                      <td className="px-4 py-2">{facility.location}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          facility.status === 'Working' ? 'bg-green-100 text-green-800' :
                          facility.status === 'Needs Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {facility.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{facility.lastInspected ? new Date(facility.lastInspected).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => alert('Edit functionality coming soon!')}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-xs font-semibold transition duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFacility(facility._id)}
                            className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-xs font-semibold transition duration-200"
                          >
                            Delete
                          </button>
                        </div>
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

export default ManagerFacilities; 