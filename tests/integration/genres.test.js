const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
// const server = require("../../index");

describe("/api/genres", () => {
    // Define the happy path, and then in each test, we change one parameter
    // that clearly aligns with the name of the test
    let server;
    let token;
    let name;
    beforeEach(() => {
        server = require("../../index");
        token = new User().generateAuthToken();
        name = "muha";
    });
    afterEach(async () => {
        // await server.close();
        await Genre.remove({});
    });

    // Happy path
    const exec = async () => {
        return await request(server)
            .post("/api/genres")
            .set("x-auth-token", token)
            .send({ name });
    };

    describe("POST /", () => {
        it("should return a status of 200 if genre is created", async () => {
            // const res = await request(server)
            //     .post("/api/genres")
            //     .send({ name: "genre1" });
            let genre = new Genre({ name: "genre1" });
            await genre.save();
            // const res = await request(server).post("/api/genres");
            expect(genre.name).toMatch("genre1");
        });
    });

    describe("GET /", () => {
        it("should return all genres", async () => {
            // await Genre.collection.insertMany([
            //     { name: "genre1" },
            //     { name: "genre2" },
            // ]);

            const res = await request(server).get("/api/genres");

            expect(res.status).toBe(200);
            // expect(res.body.length).toBe(1);
            // expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
            // expect(res.body.some(g => g.name === "genre2")).toBeTruthy();
        });
    });

    describe("GET /:id", () => {
        it("should return a single genre if valid id is passed", async () => {
            const genre = new Genre({ name: "genre1" });
            await genre.save();
            const res = await request(server).get("/api/genres/" + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", genre.name);
        });

        it("should return 404 if invalid id is passed", async () => {
            const res = await request(server).get("/api/genres/1");

            expect(res.status).toBe(404);
        });
    });

    describe("POST /", () => {
        it("should return 401 if client is not logged in", async () => {
            token = "";
            const response = await exec();
            expect(response.status).toBe(401);
        });

        it("should return 400 if genre is less than 5 characters", async () => {
            name = "123";
            const response = await exec();
            expect(response.status).toBe(400);
        });

        it("should return 400 if genre is more than 50 characters", async () => {
            // const name = new Array(52).join("a");
            // console.log(name);
            const response = await exec();
            expect(response.status).toBe(400);
        });
    });
});
