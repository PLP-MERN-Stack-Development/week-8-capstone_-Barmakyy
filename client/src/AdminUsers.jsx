import React, { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const roles = ['admin', 'manager', 'staff'];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    setError('');
    setSuccess('');
    setUpdatingId(id);
    try {
      await api.put(`/users/${id}/role`, { role: newRole });
      setSuccess('Role updated successfully');
      fetchUsers();
    } catch (err) {
      setError('Failed to update role');
    }
    setUpdatingId(null);
  };

  const handleSuspend = async (id, suspended) => {
    setError('');
    setSuccess('');
    setUpdatingId(id);
    try {
      await api.put(`/users/${id}/suspend`, { suspended: !suspended });
      setSuccess(suspended ? 'User unsuspended' : 'User suspended');
      fetchUsers();
    } catch (err) {
      setError('Failed to update suspension');
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setError('');
    setSuccess('');
    setUpdatingId(id);
    try {
      await api.delete(`/users/${id}`);
      setSuccess('User deleted');
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
    setUpdatingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 py-10 px-2 md:px-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-teal-100 hover:bg-teal-200 text-teal-700 font-bold py-2 px-4 rounded-lg shadow-sm transition"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-teal-700 text-center drop-shadow">User Management</h2>
        </div>
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading users...</p>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Change Role</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-teal-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                      {user.name}
                      {user.suspended && (
                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-semibold">Suspended</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                    <td className="px-4 py-3 text-teal-700 font-semibold capitalize">{user.role}</td>
                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        disabled={user.role === 'admin' && user.email === JSON.parse(localStorage.getItem('user'))?.email || updatingId === user._id}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      {updatingId === user._id && <span className="ml-2 text-xs text-gray-400">Updating...</span>}
                    </td>
                    <td className="px-4 py-3">
                      {user.suspended ? (
                        <span className="text-red-600 font-semibold">Suspended</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleSuspend(user._id, user.suspended)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold shadow transition ${user.suspended ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                        disabled={updatingId === user._id}
                      >
                        {user.suspended ? 'Unsuspend' : 'Suspend'}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold shadow bg-red-100 text-red-700 hover:bg-red-200 transition"
                        disabled={updatingId === user._id}
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
        {success && <div className="text-green-600 text-center mt-4">{success}</div>}
      </div>
    </div>
  );
};

export default AdminUsers; 