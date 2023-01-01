const { Movie, validateMovie } = require("../models/movie");
const express = require("express");
const { Genre } = require("../models/genre");
const router = express.Router();

// Create Movies
router.post("/", async (req, res) => {
    // Validates the request body
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checks for the genreId and if valid
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid id");

    const movie = await Movie.create({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    res.send(movie);
});

// Get all movies
router.get("/all", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).send(movies);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
