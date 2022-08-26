const mongoose = require('mongoose');

function validateEmail(mail) {
    //fonction qui check email
}

const modelUsers = new mongoose.Schema({
    user_id: {
        type: Number,
        auto: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    pseudo: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // validate: validateEmail,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    url_avatar: {
        type: String,
    },
    sexe: {
        type: String,
    },
    phone: {
        type: String,
    },
    country: {
        type: String
    },
    town: {
        type: String
    },
    level: {
        type: Number
    },
    stats: {
        type: [{
            Warrior: { type: Number },
            Mage: { type: Number },
            Taverner: { type: Number }
        }]
    },
    checkId: {
        type: Boolean
    },
    NumbQuest: {
        type: {
            Warrior: { type: Number },
            Mage: { type: Number },
            Taverner: { type: Number },
        }
    },
    bio: {
        type: String,
        default: "Je suis un padawan"
    },
    admin: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('users', modelUsers);