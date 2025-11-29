const express = require('express');
const router = express.Router();
const { getAllStaff, createStaffProfile, getStaffById, updateStaffProfile } = require('../controllers/staffController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', authorize('admin'), getAllStaff);
router.post('/', authorize('admin'), createStaffProfile);
router.get('/:id', getStaffById);
router.put('/:id', authorize('admin'), updateStaffProfile);

module.exports = router;
