const express = require('express');
const router = express.Router();
const { registerPatient, getAllPatients, getPatientById, updatePatient } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', authorize('admin', 'receptionist'), registerPatient);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.put('/:id', authorize('admin', 'receptionist', 'doctor'), updatePatient);

module.exports = router;
