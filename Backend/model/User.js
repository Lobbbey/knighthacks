const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, " Enter your Email address"],
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
            "Please add a valid Email"
        ]

    },
    password: {
        type: String, 
        required: [true, "Please enter your password"],
        minlength: 8,
        select: false
    },
    createdAt: {},
})

module.exports = mongoose.model('User', UserSchema);