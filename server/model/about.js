const mongoose = require('mongoose');

const AboutSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contant: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("About", AboutSchema)