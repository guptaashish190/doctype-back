const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Patient = require('../models/PatientSchema');
const Appointment = require('../models/AppointmentSchema');

router.post('/new', (req, res) => {
    console.log(req.body);
    new Patient(req.body).save((err) => {
        console.log(err)
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


router.post('/requestAppointment', (req, res) => {
    const {name, description, doctorID, patientID, date, time} = req.body;

    const appointment = {
        name,
        description,
        doctorID,
        patientID,
        date,
        time
    }

    new Appointment(appointment).save((err) => {
        if(err){
            res.send({
                err,
                message: 'Request Failed',
                success: false
            });
        }else{
            res.send({
                err: null,
                message: 'Appointment created',
                success: true
            });
        }
    });
});

module.exports = router;