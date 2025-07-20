const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Water Point', 'Toilet', 'Handwashing Station', 'Shower'], required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Working', 'Needs Maintenance', 'Out of Service'], default: 'Working' },
  lastInspected: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Facility', facilitySchema); 