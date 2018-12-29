const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Patient = require('../models/PatientSchema');

router.post('/new', (req, res) => {
    console.log(req.body);
    new Patient(req.body).save((err) => {
        if (err) {
            res.send({
                success: false,
                message: 'error',
                error: err
            });
        } else {
            res.send({
                success: true,
                message: 'User Created',
                err: null
            });
        }
    });
});

router.get('/verify', (req, res) => {
    const { username, password } = req.query;
    Patient.findOne({ 'auth.username': username }, (err, patient) => {
        if (patient) {
            bcrypt.compare(password, patient.auth.password, (err, result) => {
                console.log(err, result);
                if (result == true) {
                    res.send({
                        valid: true,
                        data: patient
                    });
                } else {
                    res.send({
                        valid: false,
                        data: null
                    });
                }
            });
        } else {
            res.send({
                valid: false,
                data: null,
                error: err
            });
        }
    });
});

module.exports = router;