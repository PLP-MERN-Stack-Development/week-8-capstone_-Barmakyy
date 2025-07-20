const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', auth, upload.array('images'), reportController.createReport);
router.get('/', reportController.getReports);
router.get('/:id', reportController.getReportById);
router.put('/:id', auth, requireRole('admin', 'manager'), reportController.updateReport);
router.put('/:id/status', auth, requireRole('admin', 'manager'), reportController.updateReportStatus);
router.delete('/:id', auth, requireRole('admin', 'manager'), reportController.deleteReport);

module.exports = router; 