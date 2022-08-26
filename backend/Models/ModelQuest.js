const mongoose = require('mongoose');

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
const modelQuest = new mongoose.Schema({
    id_sub_cat: {
        type: Number,
        auto: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    event_date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    expiratedAt: {
        type: Date,
        default: new Date().addDays(10)
    },
    city: {
        type: String,
        required: true
    },
    user_id_leader: {
        type: Number,
        required: true
    },
    user_id_participation: {
        type: [Number]
    },
    messages: {
        type: []
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('quest', modelQuest);