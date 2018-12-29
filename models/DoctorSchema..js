const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const Doctor = new Schema({
    auth: {
        username: String,
        password: String
    },
    basic: {
        name: String,
        age: Number,
        dob: Date,
        maritalStatus: String,
    },
    currentPatients: [String],
    allPatients: [String],
    contact: {
        phone: [Number],
        address: [String],
        email: [String]
    },
    qualifications: [String],
    clinic: String,
    hospital: String,
    type: String
});

Doctor.pre('save', function (next) {
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

module.exports = mongoose.model("doctors", Doctor, "doctors");