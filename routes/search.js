const router = require('express').Router();
const Doctor = require('../models/DoctorSchema');

function getDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


router.get('/getDoctors', (req,res) => {
    const {long, lat} = req.query;

    Doctor.find({}).then((doctors) => {
        let sortedDocs = doctors;
        sortedDocs.sort((doc1,doc2) => {
          const distanced1 = getDistance(doc2.clinic[1],doc2.clinic[0], lat,long);
          const distanced2 = getDistance(doc1.clinic[1],doc1.clinic[0], lat,long);
          // console.log(doc1.basic.name,  distanced2 , ' || ' , doc2.basic.name, distanced1);
          return (distanced2 - distanced1);
        });
        console.log(sortedDocs.length);
        res.send(sortedDocs);
    } );
});

module.exports = router;