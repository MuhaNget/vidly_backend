const express = require("express");
const moment = require("moment");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const Joi = require("joi");
const router = express.Router();

router.post("/", auth, async (req, res) => {
    if (!req.body.customerId)
        return res.status(400).send("CustomerId not provided");
    if (!req.body.movieId) return res.status(400).send("MovieId not provided");

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send("Rental not found");
    if (rental.dateReturned)
        return res.status(400).send("Return already processed");

    rental.return();
    await rental.save();

    await Movie.updateOne(
        { _id: rental.movie._id },
        { $inc: { numberInStock: 1 } }
    );

    return res.send(rental);
});

// function validateReturn(req) {
//     const schema = {
//         customerId: Joi.objectId().required(),
//         movieId: Joi.objectId().required(),
//     };

//     return Joi.validate(req, schema);
// }

module.exports = router;
