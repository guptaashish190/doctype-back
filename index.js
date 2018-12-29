const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./keys');
const app = express();

// Port
const PORT = process.env.PORT || 3005;

app.use(morgan("dev"));

mongoose.connect(`mongodb://${keys.mongoDB.user}:${keys.mongoDB.pass}@ds145474.mlab.com:45474/doctype`, err => {
    err ? console.log(err) : console.log("Connected to db");
});

app.listen(PORT, () => {
    console.log('Listening');
});