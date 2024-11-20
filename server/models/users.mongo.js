const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    intro: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'user', // Set default value to 'user'
        enum: ['admin', 'user']
    },
    createdAt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', usersSchema);