const genres = require("../routes/genres");
const customers = require("../routes/customers");
const rentals = require("../routes/rentals");
const movies = require("../routes/movies");
const users = require("../routes/users");
const auths = require("../routes/auths");
const error = require("../middleware/error");
const cors = require("cors");
const returns = require("../routes/returns");
const express = require("express");

// Middleware routes
module.exports = function (app) {
    app.use(express.json());
    app.use("/api/genres", genres);
    app.use("/api/customers", customers);
    app.use("/api/movies", movies); // Scope plus route name
    app.use("/api/rentals", rentals);
    app.use("/api/users", users);
    app.use("/api/auths", auths);
    app.set("trust proxy", true);
    app.use("/api/returns", returns);
    app.use(cors());
    app.use(error);
};
