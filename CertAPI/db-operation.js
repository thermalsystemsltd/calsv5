const { get } = require("./pool-manager");

async function getCompanyData(connections) {
  try {
    const query = `SELECT company.companyName as "CompanyName" FROM company`;

    var data = [];
    for (const connection of connections) {
      console.log('get company data: ', connection);
      const pool = await get(connection);
      var results = await pool.request().query(query);
      results.recordsets[0][0].CompanyName = connection;
      // console.log(results.recordsets[0][0]);
      data.push(results.recordsets[0][0]);
    }
    console.log(data);
    return data;
  } catch (err) {
    //log error and close connection
    console.log(err.message);
  }
}

async function getGridList() {
  try {
    const query = `SELECT grid.gridName as "gridName" FROM grid`;  
    const pool = await get('Calibration'); //name of connection pool
    let results = await pool.request().query(query);
    console.log(results.recordsets[0]);
    return results.recordsets[0];
  } catch (error) {
    console.log(error.message);
  }
}

async function getCalibrationData(serialNo){
  try {
    const query = `
    Select s.sensorSerialNo as 'serialNo' ,s.HardwareSerialNo as'hardwareNo',
        sd.Channel1_Data as 'temp', sd.captureTime		 
    from dbo.sensordata sd
    Join dbo.sensor s
    ON sd.Sensor_sensorSerialNo = s.sensorSerialNo
    Where s.sensorSerialNo = @input_parameter`
    const pool = await get('Calibration'); //name of connection pool
    let results = await pool
    .request()
    .input("input_parameter", serialNo)
    .query(query);
      console.log(results.recordsets[0]);
      console.log("Probe Data: " ,results.recordsets[0].length);

    return results.recordsets[0];
  } catch (error) {
    console.log(error.message);
  }
}

//return unique list of probe Serial anbd Hardware no
async function getCalibrationProbes(grid){
  try {
    const query = 
      `SELECT s.sensorSerialNo as 'serialNo', HardwareSerialNo as 'hardwareNo'
      FROM dbo.gridsensor gs
      LEFT JOIN dbo.grid g
      ON gs.idGrid = g.idGrid
      Join dbo.sensor s
      ON gs.sensorSerialNo = s.sensorSerialNo
      WHERE gridName = @input_parameter`
    const pool = await get('Calibration'); //name of connection pool
    let results = await pool
    .request()
    .input("input_parameter", grid)
    .query(query);
      console.log(results.recordsets[0]);
      console.log("Probe Results: " ,results.recordsets[0].length);
    return results.recordsets[0];
  } catch (error) {
    console.log(error.message);
  }
}

//returns probe data (temp and timeStamp) for specified probe produced after date selected
// comparison is > date NOT >= to avoid pulling last data again
async function getLiveData(probeSerialNo, calibrationDate){
  try {
    const query = 
      `SELECT  
      captureTime,
      channel1_Data as "temp"
      FROM 
      sensordata
    WHERE  Sensor_sensorSerialNo = @input_probe
    AND captureTime > Convert(datetime, @input_date )
    Order by captureTime DESC
      `
    const pool = await get('Calibration'); //name of connection pool
    let results = await pool
    .request()
    .input("input_probe", probeSerialNo)
    .input("input_date", calibrationDate)
    .query(query);
      console.log(results.recordsets[0]);
      console.log("Probe Data: " ,results.recordsets[0]?.length);
    return results.recordsets[0];
  } catch (error) {
    console.log(error.message);
  }
}


async function getRetroTest(probeSerialNo, calibrationDate, calibrationEndDate) {
  try {
    const query = 
      `SELECT  
      captureTime,
      channel1_Data as "temp"
      FROM 
      sensordata
    WHERE  Sensor_sensorSerialNo = @input_probe
    AND captureTime > Convert(datetime, @input_date )
    Order by captureTime DESC
      `
    const pool = await get('Calibration'); //name of connection pool
    let results = await pool
    .request()
    .input("input_probe", probeSerialNo)
    .input("input_date", calibrationDate)
    .query(query);
      console.log(results.recordsets[0]);
      console.log("Probe Data: " ,results.recordsets[0]?.length);
    return results.recordsets[0];
  } catch (error) {
    console.log(error.message);
  }
}
async function getRetroData(probeSerialNo, startDateTime, endDateTime) {
  console.log('getRetroData');
  try {
    const query = 
      `SELECT captureTime,
      channel1_Data as "temp"
      FROM 
      sensordata
    WHERE  Sensor_sensorSerialNo = @input_probe
    AND captureTime > Convert(datetime, @input_start)
    AND captureTime < Convert(datetime, @input_end)
    Order by captureTime DESC
      `
    const pool = await get('Calibration'); //name of connection pool
    let results = await pool
    .request()
    .input("input_probe", probeSerialNo)
    .input("input_start", startDateTime)
    .input("input_end", endDateTime)
    .query(query);
      console.log(results.recordsets[0]);
      console.log("Probe Data: " ,results.recordsets[0]?.length);
    return results.recordsets[0];
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
 
  getCompanyData: getCompanyData,
  getGridList: getGridList,
  // getEngineerData: getEngineerData,
  getCalibrationData: getCalibrationData,
  getCalibrationProbes: getCalibrationProbes,
  getLiveData: getLiveData,
  getRetroData:getRetroData,
  getRetroTest:getRetroTest
};
