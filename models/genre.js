const Joi = require("joi");
const mongoose = require("mongoose");

// Create Schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});
const Genre = mongoose.model("Genre", genreSchema);

// Validate Scheme
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    };

    return Joi.validate(genre, schema);
}

module.exports = {
    Genre,
    genreSchema,
    validateGenre,
};
