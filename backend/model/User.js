const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
        trim: true,
    },
    email: {},
    password: {},
    createdAt: {},
})

module.exports = mongoose.model('User', UserSchema);