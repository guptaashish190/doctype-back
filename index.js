const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./keys');
const SearchRoute = require('./routes/search');
const bodyParser = require('body-parser');
const app = express();

//Routes
const PatientRoute = require('./routes/patient');
const DoctorRoute = require('./routes/doctor');

// Port
const PORT = process.env.PORT || 8080;
// Use BodyParser for handlingPOST Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect(`mongodb://${keys.mongoDB.user}:${keys.mongoDB.pass}@ds145474.mlab.com:45474/doctype`, err => {
    err ? console.log(err) : console.log("Connected to db");
});

app.use('/patient', PatientRoute);
app.use('/doctor', DoctorRoute);
app.use('/search', SearchRoute);
app.get('/', (req, res) => {
    res.send('Working');
});


app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});