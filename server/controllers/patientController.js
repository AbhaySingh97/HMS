const Patient = require('../models/Patient');
const User = require('../models/User');

// Generate UHID
const generateUHID = async () => {
    const count = await Patient.countDocuments();
    return `UHID${String(count + 1).padStart(6, '0')}`;
};

// @desc    Register new patient
// @route   POST /api/patients
// @access  Private (Receptionist/Admin)
exports.registerPatient = async (req, res) => {
    try {
        const { userId, dateOfBirth, gender, bloodGroup, address, emergencyContact } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if patient already exists
        const existingPatient = await Patient.findOne({ userId });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient profile already exists' });
        }

        const uhid = await generateUHID();

        const patient = await Patient.create({
            userId,
            uhid,
            dateOfBirth,
            gender,
            bloodGroup,
            address,
            emergencyContact,
            ...req.body
        });

        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
            .populate('userId', 'name email phone')
            .sort({ registrationDate: -1 });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
            .populate('userId', 'name email phone');

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
