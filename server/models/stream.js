const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    streamDate: {
        type: String,
        required: true
    },
    streamStartTime: {
        type: String,
        required: true
    },
    streamEndTime: {
        type: String,
        required: true
    },
    streamType: {
        type: String,
        required: true
    },
    streamCost: {
        type: String
    },
    streamPoster: {
        type: String
    },
    streamExpiryAt: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Stream', streamSchema);