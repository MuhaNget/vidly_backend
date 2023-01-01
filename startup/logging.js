require("express-async-errors");
// require("winston-mongodb");
const winston = require("winston");

module.exports = function () {
    // Handling un-caught exception
    winston.exceptions.handle(
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true,
        }),
        new winston.transports.File({ filename: "uncaughtExceptions.log" })
    );

    // Handling promise rejections
    process.on("unhandledRejection", ex => {
        throw ex;
    });

    // Handle project info's (connecting to db, Port number)
    winston.add(
        new winston.transports.File({
            filename: "logfile.log",
        })
    );
};
