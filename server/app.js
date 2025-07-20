const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const facilityRoutes = require('./routes/facilityRoutes');
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/facilities', facilityRoutes);
app.use('/api/reports', reportRoutes);
const auditLogRoutes = require('./routes/auditLogRoutes');
app.use('/api/audit-logs', auditLogRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('WASH Facility Monitoring System API');
});

module.exports = app; 