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

  test("creation fails with proper status code and message if username is already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with proper status code and message if username is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Ab",
      name: "Bo",
      password: "1234",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert(
      result.body.error.includes("is shorter than the minimum allowed length")
    );
  });

  test("creation fails with proper status code and message if password is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Abc",
      name: "Bob",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert(
      result.body.error.includes("Password must be longer than 3 characters")
    );
  });
});
