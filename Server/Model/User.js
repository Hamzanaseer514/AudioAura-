const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    premium: {
        type: String,
        enum: ['none', 'monthly', 'yearly'],
        default: 'none', 
    },
    premiumExpiresAt: { type: Date, default: null },
}, { timestamps: true }); 

const User = mongoose.model('User', UserSchema); 

module.exports = User; 
