const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const Patient = new Schema({
    auth: {
        username: String,
        password: String
    },
    basic: {
        name: String,
        age: Number,
        height: Number,
        weight: Number,
        dob: Date,
        maritalStatus: String,
    },
    current: [String],
    history: [String],
    contact: {
        phone: [Number],
        address: [String],
        email: [String]
    },
    doctors: {
        doctorid: String,
        problemid: String,
    }
});

Patient.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.auth.password, salt, function (err, hash) {
            if (err) return next(err);
            user.auth.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("patients", Patient, "patients");