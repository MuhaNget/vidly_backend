const winston = require("winston");

function error(err, req, res, next) {
    // Log exception
    winston.error(err.message, err); // error, warn, info, verbose, debug, silly
    res.status(500).send("Something Failed");
}

module.exports = error;
