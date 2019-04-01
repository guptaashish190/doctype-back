const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Patient = require('../models/PatientSchema');
const Doctor = require('../models/DoctorSchema');
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
    const {name, description, doctorID, patientID, date, time, status} = req.body;

    const appointment = {
        name,
        description,
        doctorID,
        patientID,
        date,
        time,
        status,
    }
    const selectedDate = new Date(date);
    Appointment.findOne({patientID, doctorID, status: 'Requested' }, (err, result) => {
        if(result){
            res.send({
                err: 'APPOINTMENT_REQ_PENDING',
                message: 'An appointment request is already pending to this doctor.',
                success: false
            });
        }else{
            new Appointment(appointment).save((err) => {
                if(err){
                    res.send({
                        err: 'Request Failed',
                        message: 'Could not send the request to the doctor.\nPlease try again!',
                        success: false
                    });
                }else{
                    res.send({
                        err: null,
                        message: `The appointment has been requested to the Doctor: ${name} on ${selectedDate.getDate()}/${selectedDate.getMonth()}/${selectedDate.getFullYear()} at ${time.hour}:${time.minute}`,
                        success: true
                    });
                }
            });
        }
    });
});

router.get('/getAppointments', (req, res) => {
    const {patientID} = req.query;

    Appointment.find({patientID}, (err, appointments) => {
        const doctorIDs = appointments.map(a => a.doctorID);
        console.log(doctorIDs);
        const DoctorNamePromises = [];

        doctorIDs.forEach(id => {
            DoctorNamePromises.push(Doctor.findById(id));
        })

        Promise.all(DoctorNamePromises).then(reso => {
            const doctorNames = reso.map(doctor => doctor ? doctor.basic.name: null);
            const apps = appointments.map((a,i) => (a._doc ? ({...a._doc,doctorName: doctorNames[i] }): null));
        if(err){
            res.send({
                err,
                appointments: [],
                success: false,
            });
        }else{
            res.send({
                err: null,
                appointments: apps,
                success: true,
            });
        }
        });
    });
});

module.exports = router;