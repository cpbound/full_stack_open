const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("most author likes", () => {
  test("of empty list to equal an empty object", () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test("of a single blog list to equal that author", () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog);
    console.log(result)

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a blog list to equal the author with the most likes", () => {
    const result = listHelper.mostLikes(helper.initialBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

describe("most blogs", () => {
  test("of empty list to equal an empty object", () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test("of a single blog list to equal that author", () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a blog list to equal the author with the most blogs", () => {
    const result = listHelper.mostBlogs(helper.initialBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("to equal 12", () => {
    const result = listHelper.favouriteBlog(helper.initialBlogs);
    expect(result).toEqual(helper.initialBlogs[0]);
  });
});

describe("total likes", () => {
  test("of an empty list equals 0", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when a list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a blogger list to show correct total", () => {
    const result = listHelper.totalLikes(helper.initialBlogs);
    expect(result).toBe(36);
  });
});
