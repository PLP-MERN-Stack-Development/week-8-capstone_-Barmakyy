const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// GET /api/users - list all users (admin can see all, manager can see staff only)
router.get('/', auth, requireRole('admin', 'manager'), async (req, res) => {
  try {
    console.log('User role:', req.user.role); // Debug log
    let users;
    if (req.user.role === 'admin') {
      // Admin can see all users
      users = await User.find({}, '-password');
    } else if (req.user.role === 'manager') {
      // Manager can only see staff users
      users = await User.find({ role: 'staff' }, '-password');
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// PUT /api/users/:id/role - update user role (admin only)
router.put('/:id/role', auth, requireRole('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    if (!['admin', 'manager', 'staff'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, select: '-password' });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user role', error: err.message });
  }
});

// PUT /api/users/:id/suspend - suspend/unsuspend user (admin only)
router.put('/:id/suspend', auth, requireRole('admin'), async (req, res) => {
  try {
    const { suspended } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { suspended }, { new: true, select: '-password' });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user suspension', error: err.message });
  }
});

// DELETE /api/users/:id - delete user (admin only)
router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

module.exports = router; 