const mongoose = require('mongoose');


const modelSubCat = new mongoose.Schema({
    id_cat: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('sub_category', modelSubCat);