const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User');

// @desc    Book appointment
// @route   POST /api/appointments
// @access  Private
exports.bookAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate, timeSlot, reason, type } = req.body;

        const appointment = await Appointment.create({
            patientId,
            doctorId,
            appointmentDate,
            timeSlot,
            reason,
            type: type || 'new'
        });

        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate('patientId')
            .populate('doctorId', 'name email role');

        res.status(201).json(populatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
    try {
        let query = {};

        // Filter based on role
        if (req.user.role === 'doctor') {
            query.doctorId = req.user.id;
        } else if (req.user.role === 'patient') {
            const patient = await Patient.findOne({ userId: req.user.id });
            if (patient) {
                query.patientId = patient._id;
            }
        }

        const appointments = await Appointment.find(query)
            .populate('patientId')
            .populate('doctorId', 'name email')
            .populate('departmentId', 'name')
            .sort({ appointmentDate: 1 });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('patientId').populate('doctorId', 'name email');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get available time slots
// @route   GET /api/appointments/slots/:doctorId/:date
// @access  Private
exports.getAvailableSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.params;

        const bookedAppointments = await Appointment.find({
            doctorId,
            appointmentDate: new Date(date),
            status: { $in: ['scheduled', 'confirmed'] }
        });

        const bookedSlots = bookedAppointments.map(apt => apt.timeSlot);

        const allSlots = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
        ];

        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
