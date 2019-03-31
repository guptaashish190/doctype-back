const router = require('express').Router();
const Doctor = require('../models/DoctorSchema');
const Patient = require('../models/PatientSchema');

router.get('/username', (req, res) => {
    const { username, type } = req.query;
    console.log(username, type);
    if(type === 'Patient'){
        Patient.findOne({ 'auth.username': username }, (err, patient) => {
            if (patient) {
                res.send({
                    status: 'Username taken',
                });
            } else {
                res.send({
                    status: 'Username free'
                });
            }
        });
    }else{
        Doctor.findOne({ 'auth.username': username }, (err, doctor) => {
            if (doctor) {
                res.send({
                    status: 'Username taken',
                });
            } else {
                res.send({
                    status: 'Username free'
                });
            }
        });
    }
});

module.exports = router;