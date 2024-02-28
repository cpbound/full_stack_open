const assert = require("node:assert");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "root", passwordHash });

    await user.save();
  });

  test("a user with a unique username can be added", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    console.log(usersAtEnd, usersAtStart);
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});
