const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./index");

// Running port
const port = process.env.PORT || 8000;

app.listen(port, () => winston.info(`Listening on port ${port}...`));
