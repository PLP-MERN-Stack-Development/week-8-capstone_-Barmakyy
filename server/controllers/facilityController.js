const Facility = require('../models/Facility');
const AuditLog = require('../models/AuditLog');

exports.createFacility = async (req, res) => {
  try {
    console.log('Creating facility with data:', req.body); // Debug log
    const facility = new Facility(req.body);
    await facility.save();
    console.log('Facility created successfully:', facility); // Debug log
    // Audit log
    await AuditLog.create({
      user: req.user.userId,
      action: 'create',
      targetType: 'Facility',
      targetId: facility._id,
      details: req.body
    });
    res.status(201).json(facility);
  } catch (err) {
    console.error('Error creating facility:', err); // Debug log
    res.status(400).json({ message: 'Error creating facility', error: err.message });
  }
};

exports.getFacilities = async (req, res) => {
  try {
    const { type, status, location } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: 'i' };
    const facilities = await Facility.find(filter);
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching facilities', error: err.message });
  }
};

exports.getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    res.json(facility);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching facility', error: err.message });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    // Audit log
    await AuditLog.create({
      user: req.user.userId,
      action: 'update',
      targetType: 'Facility',
      targetId: facility._id,
      details: req.body
    });
    res.json(facility);
  } catch (err) {
    res.status(400).json({ message: 'Error updating facility', error: err.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    // Audit log
    await AuditLog.create({
      user: req.user.userId,
      action: 'delete',
      targetType: 'Facility',
      targetId: facility._id,
      details: facility
    });
    res.json({ message: 'Facility deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting facility', error: err.message });
  }
}; 