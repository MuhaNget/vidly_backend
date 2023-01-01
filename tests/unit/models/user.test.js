const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

describe("user.generateAuthToken", () => {
    it("should return a valid JWT", () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true,
        };
        console.log(payload);
        const user = new User(payload);
        const token = user.generateAuthToken();
        console.log(token);
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        expect(decoded).toMatchObject(payload);
    });
});
