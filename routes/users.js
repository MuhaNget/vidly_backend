const { User, validateUser } = require("../models/user");
const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

// Get user
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

// Register User api
router.post("/", async (req, res) => {
    // Validates the request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Validating email
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    // Create User and hash password of user
    user = await new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // Generate Token
    const token = user.generateAuthToken();

    res.header("x-auth-token", token)
        .status(200)
        .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
