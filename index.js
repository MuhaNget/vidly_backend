const express = require("express");

// Creates the express app
const app = express();

require("./startup/logging")();
require("./startup/routes")(app); // returns a function so we call it and pass the app object
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);

module.exports = app;
