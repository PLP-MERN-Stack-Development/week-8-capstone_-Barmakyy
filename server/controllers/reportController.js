const Report = require('../models/Report');
const { sendEmail } = require('../utils/email');
const AuditLog = require('../models/AuditLog');

exports.createReport = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => '/uploads/' + file.filename);
    }
    const report = new Report({
      ...req.body,
      reportedBy: req.user.userId,
      images
    });
    await report.save();

    // Audit log
    await AuditLog.create({
      user: req.user.userId,
      action: 'create',
      targetType: 'Report',
      targetId: report._id,
      details: req.body
    });

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const subject = 'New WASH Facility Report Submitted';
    const text = `A new report has been submitted.\n\nFacility: ${req.body.facilityId}\nIssue: ${req.body.issueType}\nDescription: ${req.body.description || ''}`;
    const html = `<h3>New WASH Facility Report Submitted</h3><p><b>Facility:</b> ${req.body.facilityId}</p><p><b>Issue:</b> ${req.body.issueType}</p><p><b>Description:</b> ${req.body.description || ''}</p>`;
    sendEmail(adminEmail, subject, text, html).catch(console.error);

    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: 'Error creating report', error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { issueType, status, facilityId, from, to } = req.query;
    let filter = {};
    if (issueType) filter.issueType = issueType;
    if (status) filter.status = status;
    if (facilityId) filter.facilityId = facilityId;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }
    const reports = await Report.find(filter)
      .populate('facilityId')
      .populate('reportedBy')
      .populate('resolvedBy');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('facilityId').populate('reportedBy').populate('resolvedBy');
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching report', error: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) return res.status(404).json({ message: 'Report not found' });
    // Audit log
    await AuditLog.create({
      user: req.user.userId,
      action: 'update',
      targetType: 'Report',
      targetId: report._id,
      details: req.body
    });
    res.json(report);
  } catch (err) {
    res.status(400).json({ message: 'Error updating report', error: err.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  try {
    console.log('Status update request:', {
      reportId: req.params.id,
      body: req.body,
      user: req.user
    });
    
    const { status } = req.body;
    if (!['open', 'in progress', 'resolved'].includes(status)) {
      console.log('Invalid status:', status);
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const report = await Report.findByIdAndUpdate(
      req.params.id, 
      { 
        status,
        resolvedBy: status === 'resolved' ? req.user.userId : null,
        resolvedAt: status === 'resolved' ? new Date() : null
      }, 
      { new: true }
    );
    
    if (!report) {
      console.log('Report not found:', req.params.id);
      return res.status(404).json({ message: 'Report not found' });
    }
    
    console.log('Report updated successfully:', report);
    
    // Audit log
    await AuditLog.create({
      user: req.user.userId,
      action: 'update',
      targetType: 'Report',
      targetId: report._id,
      details: { status, previousStatus: report.status }
    });
    
    res.json(report);
  } catch (err) {
    console.error('Error updating report status:', err);
    res.status(400).json({ message: 'Error updating report status', error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    // Audit log
    await AuditLog.create({
      user: req.user.userId,
      action: 'delete',
      targetType: 'Report',
      targetId: report._id,
      details: report
    });
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting report', error: err.message });
  }
}; 