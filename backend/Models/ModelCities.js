const mongoose = require('mongoose');


const modelCities = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postal_code: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    }
});

module.exports = mongoose.model('cities', modelCities);