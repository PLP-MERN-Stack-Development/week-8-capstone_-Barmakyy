const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// GET /api/audit-logs - admin only
router.get('/', auth, requireRole('admin'), async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('user', 'name email role').sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching audit logs', error: err.message });
  }
});

module.exports = router; 