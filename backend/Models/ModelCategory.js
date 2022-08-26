const mongoose = require('mongoose');


const modelCat = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('category', modelCat);