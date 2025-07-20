const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.post('/', auth, requireRole('admin', 'manager'), facilityController.createFacility);
router.get('/', facilityController.getFacilities);
router.get('/:id', facilityController.getFacilityById);
router.put('/:id', auth, requireRole('admin', 'manager'), facilityController.updateFacility);
router.delete('/:id', auth, requireRole('admin', 'manager'), facilityController.deleteFacility);

module.exports = router; 