const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Doctor = require('../models/DoctorSchema');
const Appointment = require('../models/AppointmentSchema');

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
    Doctor.findOne({ 'auth.username': username }, (err, doctor) => {
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

router.get('/getAppointments', (req, res) => {
    const {doctorID} = req.query;
    Appointment.find({doctorID}, (err, appointments) => {
        if(err){
            res.send({
                err,
                appointments: [],
                success: false,
            });
        }else{
            res.send({
                err: null,
                appointments,
                success: true,
            });
        }
    });
});

module.exports = router;