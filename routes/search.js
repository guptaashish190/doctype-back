const router = require('express').Router();
const Doctor = require('../models/DoctorSchema');

function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


router.get('/getDoctors', (req,res) => {
    const {long, lat} = req.query;

    Doctor.find({}).then((doctors) => {
        let sortedDocs = doctors;
        sortedDocs.sort((doc1,doc2) =>getDistance(doc2[0],doc2[0], long,lat) - getDistance(doc1[0],doc1[0], long,lat));
        res.send(sortedDocs);
    } );
});

module.exports = router;