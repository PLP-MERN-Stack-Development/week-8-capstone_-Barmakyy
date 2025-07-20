const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'staff'], default: 'staff' },
  phone: { type: String },
  suspended: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 