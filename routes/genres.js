const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Genre, validateGenre } = require("../models/genre");

// Fetch all the data in DB
router.get("/", async (req, res) => {
    const genres = await Genre.find({}).sort("name");
    res.send(genres);
});

//  Create a document in DB
router.post("/", auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.status(200).send(genre);
});

// Update a document in DB
router.put("/:id", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    if (!genre)
        return res
            .status(404)
            .send("The genre with the given ID was not found.");

    res.send(genre);
});

// Delete a document in DB
router.delete("/:id", [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
        return res
            .status(404)
            .send("The genre with the given ID was not found.");

    res.send(genre);
});

// Fetch a single document
router.get("/:id", validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre)
        return res
            .status(404)
            .send("The genre with the given ID was not found.");

    res.send(genre);
});

module.exports = router;
