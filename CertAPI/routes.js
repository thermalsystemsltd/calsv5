const express = require("express");
const router = express.Router();
const operations = require("./db-operation");
const pm = require("./pool-manager");

module.exports = router;

router.use((request, response, next) => {
    //console.log('middleware pool');
    console.log('  ');
    next();
  });
  
  router.route("/calibrationData/:grid").get((request, response) => {
    console.log("Calibration Data");
    operations.getCalibrationData(request.params.grid).then((results) => {
      response.json(results);
    });
  });
  
  router.route("/calibrationProbes/:grid").get((request, response) => {
    console.log("Calibration Probes: "+request.params.grid);
    operations.getCalibrationProbes(request.params.grid).then((results) => {
      response.json(results);
    });
  });

  router.route("/getLiveData/:serialNo/:date").get((request, response) => {
    console.log("Live Data: "+request.params.serialNo,request.params.date);
    operations.getLiveData(request.params.serialNo,request.params.date).then((results) => {
      response.json(results);
    });
  });
  router.route("/getRetroTest/:serialNo/:date/:endDate").get((request, response) => {
    console.log("Live Data: "+request.params.serialNo,request.params.date);
    operations.getRetroTest(request.params.serialNo,request.params.date,request.params.endDate).then((results) => {
      response.json(results);
    });
  });

  router.route("/getRetroData/:serialNo/:startDateTime/:endDateTime").get((request, response) => {
    console.log("Retro Data: "+request.params.serialNo,request.params.startDateTime,request.params.endDateTime);
    operations.getRetroData(request.params.serialNo,request.params.startDateTime,request.params.endDateTime).then((results) => {
      response.json(results);
    });
  });

  router.route("/getCompanyList/").get((request, response) => {    
    response.json(pm.getCompanyList(request.params.serialNo));    
  });


  // router.route("/getRetroTest/:serialNo").get((request, response) => {    
  //   operations.getRetroTest(request.params.serialNo,request.params.startDateTime).then((results) => {
  //     response.json(results);
  //   });
  // });

  // router.route("/getEngineerList/").get((request, response) => {
  //   operations.getEngineerList().then((results) => {
  //     response.json(results);
  //   });
  // });
  router.route("/getGridList/").get((request, response) => {
    operations.getGridList().then((results) => {
      response.json(results);
    });
  });
  