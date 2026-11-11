const express = require("express");
const route = express.Router();

const dashboardcontroller = require("../controllers/dashboard");
//const merchantcontroller = require("../controllers/merchant");

// Changed from .post to .get, and matched .dashboard
route.get("/flights", dashboardcontroller.dashboard);
route.get("/flight/:id", dashboardcontroller.flightById);
route.get("/flightUpdate/:id", dashboardcontroller.flightDataUpdateById);
route.get("/flightRemove/:id", dashboardcontroller.flightDataDeleteById);

module.exports = route;
