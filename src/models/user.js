const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: String,
    },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;