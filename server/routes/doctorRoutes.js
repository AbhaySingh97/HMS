const express = require('express');
const router = express.Router();
const { searchDoctors } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

// Public route or protected? Usually protected for patients
router.get('/search', protect, searchDoctors);

module.exports = router;
