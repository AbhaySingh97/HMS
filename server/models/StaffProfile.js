const mongoose = require('mongoose');

const staffProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    designation: {
        type: String,
        required: true
    },
    specialization: {
        type: String // For doctors
    },
    qualifications: [{
        degree: String,
        institution: String,
        year: Number
    }],
    experience: {
        type: Number, // Years of experience
        default: 0
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    salary: {
        type: Number,
        required: true
    },
    workSchedule: {
        type: String,
        enum: ['full-time', 'part-time', 'contract'],
        default: 'full-time'
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String
    },
    documents: [{
        type: String,
        url: String
    }],
    status: {
        type: String,
        enum: ['active', 'on-leave', 'terminated'],
        default: 'active'
    }
});

module.exports = mongoose.model('StaffProfile', staffProfileSchema);
