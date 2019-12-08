const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        maxlength: 128,
        required: true
    },
    image: {
        type: String
    },
    genre: [
        String
    ],
    actor: [
        String
    ],
    director: [
        String
    ],
    description: {
        type: String
    },
    datePublished: {
        type: String
    },
    rating: {
        type: Number
    },
    duration: {
        type: String
    },
    trailer: {
        type: {
            url: String,
            description: String
        }
    }
});

module.exports = mongoose.model("Movie", movieSchema);