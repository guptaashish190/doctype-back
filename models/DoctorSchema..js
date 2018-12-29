const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const Doctor = new Schema({
    basic: {
        username: String,
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
    console.log(user);
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("doctors", Doctor, "doctors");