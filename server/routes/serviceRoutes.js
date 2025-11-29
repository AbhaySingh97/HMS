const express = require('express');
const router = express.Router();
const {
    getServices,
    getAllServices,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getServices)
    .post(protect, authorize('admin'), createService);

router.route('/admin')
    .get(protect, authorize('admin'), getAllServices);

router.route('/:id')
    .put(protect, authorize('admin'), updateService)
    .delete(protect, authorize('admin'), deleteService);

module.exports = router;
