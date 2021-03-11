const mongoose = require('mongoose');

const SuperusersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Superuser',SuperusersSchema)
