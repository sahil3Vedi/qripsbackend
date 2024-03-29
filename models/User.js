const mongoose = require('mongoose');

// Create Schema
const UsersSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User',UsersSchema)
