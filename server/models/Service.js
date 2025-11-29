const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a service title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    icon: {
        type: String,
        required: [true, 'Please specify an icon name'],
        default: 'Activity'
    },
    color: {
        type: String,
        default: 'blue'
    },
    link: {
        type: String
    },
    actionType: {
        type: String,
        enum: ['link', 'modal', 'call'],
        default: 'link'
    },
    actionValue: {
        type: String
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Service', serviceSchema);
