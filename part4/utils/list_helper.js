const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  const sorted = blogs.sort((a, b) => b.likes - a.likes);
  return sorted[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  else if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 };
  else {
    const sortedBlogs = _.map(_.countBy(blogs, "author"), (blogs, author) => ({
      author,
      blogs,
    }));
    return _.maxBy(sortedBlogs, "blogs");
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  else if (blogs.length === 1)
    return { author: blogs[0].author, likes: blogs[0].likes };
  else {
    const sortedLikes = _.map(_.groupBy(blogs, "author"), (blogs, author) => ({
      author,
      likes: _.sumBy(blogs, "likes"),
    }));
    return _.maxBy(sortedLikes, "likes");
  }
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
