const express = require('express');
const router = express.Router();
const {
    bookAppointment,
    getAppointments,
    updateAppointment,
    getAvailableSlots
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', bookAppointment);
router.get('/', getAppointments);
router.put('/:id', authorize('doctor', 'admin', 'receptionist'), updateAppointment);
router.get('/slots/:doctorId/:date', getAvailableSlots);

module.exports = router;
