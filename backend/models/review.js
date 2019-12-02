const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }
});

module.exports = mongoose.model("Review", reviewSchema);