const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

const Blog = require("../models/blog");
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[4]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[5]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a blog has a unique id property", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Hot For Preacher",
    author: "Arto Helfflas",
    url: "www.ponglapp.com",
    likes: "1651",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("Hot For Preacher");
});

test("a blog without likes will default to 0", async () => {
  const newBlog = {
    title: "Hot For Preacher",
    author: "Arto Helfflas",
    url: "www.ponglapp.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  console.log(response.body);
  expect(response.body[6].likes).toBe(0);
});

test("a blog without a title or url will return a 400 status code", async () => {
  const newBlog = {
    url: "www.ponglapp.com",
    likes: "1651",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  console.log(response.body);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a blog can be deleted", async () => {
  const response = await api.get("/api/blogs");
  const blogToDelete = response.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await api.get("/api/blogs");
  expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.body.map((blog) => blog.title);
  expect(contents).not.toContain(blogToDelete.title);
});

test("the information of a blog can be updated", async () => {
  const response = await api.get("/api/blogs");
  const blogToUpdate = response.body[0];
  const updatedBlog = { ...blogToUpdate, likes: 10 };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(updatedBlog.likes).toBe(10);
});

afterAll(async () => {
  await mongoose.connection.close();
});
