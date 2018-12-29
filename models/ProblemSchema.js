const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Problem = new Schema({
    type: String,
    name: String,
    description: String,
    doctorID: String,
    patientID: String,
    location: String,
});

module.exports = mongoose.model("problems", Problem, "problems");