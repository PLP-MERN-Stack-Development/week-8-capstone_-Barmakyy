const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['create', 'update', 'delete'], required: true },
  targetType: { type: String, enum: ['Facility', 'Report'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object },
});

module.exports = mongoose.model('AuditLog', auditLogSchema); 