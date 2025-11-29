const StaffProfile = require('../models/StaffProfile');
const User = require('../models/User');

// @desc    Get all staff
// @route   GET /api/staff
// @access  Private (Admin)
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await StaffProfile.find()
            .populate('userId', 'name email phone role status')
            .populate('departmentId', 'name code');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create staff profile
// @route   POST /api/staff
// @access  Private (Admin)
exports.createStaffProfile = async (req, res) => {
    try {
        const { userId, employeeId, departmentId, designation, salary, qualifications } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if staff profile already exists
        const existingProfile = await StaffProfile.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ message: 'Staff profile already exists for this user' });
        }

        const staffProfile = await StaffProfile.create({
            userId,
            employeeId,
            departmentId,
            designation,
            salary,
            qualifications,
            ...req.body
        });

        res.status(201).json(staffProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get staff by ID
// @route   GET /api/staff/:id
// @access  Private
exports.getStaffById = async (req, res) => {
    try {
        const staff = await StaffProfile.findById(req.params.id)
            .populate('userId', 'name email phone role')
            .populate('departmentId', 'name code');

        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update staff profile
// @route   PUT /api/staff/:id
// @access  Private (Admin)
exports.updateStaffProfile = async (req, res) => {
    try {
        const staff = await StaffProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
