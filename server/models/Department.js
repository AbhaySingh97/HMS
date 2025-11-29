const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add department name'],
        unique: true,
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Please add department code'],
        unique: true,
        uppercase: true
    },
    description: {
        type: String
    },
    headOfDept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Department', departmentSchema);
