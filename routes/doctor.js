const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Doctor = require('../models/DoctorSchema');

router.post('/new', (req, res) => {
    new Doctor(req.body).save((err) => {
        console.log(err);
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
    Patient.findOne({ 'auth.username': username }, (err, doctor) => {
        if (doctor) {
            bcrypt.compare(password, doctor.auth.password, (err, result) => {
                console.log(err, result);
                if (result == true) {
                    res.send({
                        valid: true,
                        data: doctor
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