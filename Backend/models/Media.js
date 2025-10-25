const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    mediaType:{
        type: String,
        required: true,
        enum: ["Book", "Movie", "Music", "Video Game",],
    },
    creator:{// Author, Director, Band, Publisher
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    formats: [{ type: String }],
    genre: String,
    releaseYear: Number,
    userRating: Number,
    isbn: String,
    pageCount: Number,
    runTimeMinutes: Number,
    developer: String,
    platform: String,
});

module.exports = mongoose.model('Media', MediaSchema);