const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  issueType: { type: String, enum: ['cleanliness', 'broken', 'out of supplies', 'other'], required: true },
  description: { type: String },
  status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
  images: [{ type: String }],
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema); 