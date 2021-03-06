const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 128
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 64
    },
    isAdmin: Boolean,
    github: {
        type: {
            id: String, 
            token: String
        }
    },
    google: {
        type: {
            id: String,
            token: String
        }
    }
});

module.exports = mongoose.model("User", userSchema);