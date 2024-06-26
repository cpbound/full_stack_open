const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!request.user) {
    return response
      .status(401)
      .json({ error: "Ooh, Token missing or invalid" });
  }
  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(201).json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === request.user.id) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "Unauthorized user" });
    }

    // if (blog.user.toString() === request.user.id.toString()) {
    //   await Blog.findByIdAndRemove(request.params.id);
    //   response.status(204).end();
    // } else {
    //   return response.status(401).json({ error: "Unauthorized user" });
    // }
  }
);

module.exports = blogsRouter;
