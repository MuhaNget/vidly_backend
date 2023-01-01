const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customer");

// Create Customer
router.post("/", async (req, res) => {
    let message = [];
    let status = 400;
    let success = false;
    try {
        const customer = await Customer.create({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone,
        });
        if (customer) {
            status = 200;
            success = true;
            message.push("Customer Created");
        }
    } catch (error) {
        message.push(error.message);
    }
    res.send({ status, success, message });
});

// Get all customers
router.get("/all", async (req, res) => {
    try {
        const customer = await Customer.find({}).sort("name");
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
