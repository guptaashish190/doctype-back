const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = new Schema({
    name: String,
    description: String,
    doctorID: String,
    patientID: String,
    time: {
        hour: Number,
        minutes: Number
    },
    date: Date
    // location: String,
});

module.exports = mongoose.model("appointment", Appointment, "appointments");