const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a Title"],
    },
    mediaType: {},
    creator: {},
    user: {},
    formats: [{ type: String }],
    genre: {String},
    releaseYear: {Number},
    userRating: {Number},
    isbn: {String},
    pageCount: {Number},
    runTimeMinutes: {Number},
    developer: {String},
    platform: {String},
})

module.exports = mongoose.model('Media', MediaSchema);