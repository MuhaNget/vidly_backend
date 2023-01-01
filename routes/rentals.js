const express = require("express");
const router = express.Router();
const { Movie } = require("../models/movie");
const { Rental, validateRental } = require("../models/rental");
const { Customer } = require("../models/customer");

// Fetch all rentals
router.get("/"),
    async (req, res) => {
        try {
            const rentals = await Rental.find({}).sort("-dateOut");
            res.status(200).send(rentals);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

// Create Rentals
router.post("/", async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie.");

    if (movie.numberInStock === 0)
        return res.status(400).send("Movie not in stock.");

    let rental = new Rental({
        customer: {
            _id: customer._id,
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
    });

    rental = await rental.save();
    movie.numberInStock--;
    movie.save();

    res.status(200).send("Rentals Created");
});

// Fetch by id
router.get("/:id", async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental)
            return res.status(400).send("The rental with the ID is not found");
        res.status(200).send(rental);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
