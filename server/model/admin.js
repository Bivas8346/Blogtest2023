const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin:{
        type:Boolean,
        default:true
      },
    token: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Admin",AdminSchema)