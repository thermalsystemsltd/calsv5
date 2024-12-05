const pm = require("./pool-manager");
const routes = require ("./routes");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

//setup ap and router
var app = express();

//establish app uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/calibration-api", routes);

//app listening on port and setup connection pools
var port = process.env.PORT || 8090;
app.listen(port);
//setup connections and return names reference array
pm.setup();
// console.log(connections);
console.log("Calibration Api is running at " + port);
