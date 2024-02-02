const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: ''
    }
},
{ timestamps: true },);

module.exports = mongoose.model("Post",postSchema)