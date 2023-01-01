const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };
