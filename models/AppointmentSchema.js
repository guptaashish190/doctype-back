const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = new Schema({
    name: String,
    description: String,
    doctorID: Schema.Types.ObjectId,
    patientID: Schema.Types.ObjectId,
    time: {
        hour: Number,
        minutes: Number
    },
    date: Date,
    shareBio: Boolean,
    status: String
    // location: String,
});

module.exports = mongoose.model("appointments", Appointment, "appointments");
