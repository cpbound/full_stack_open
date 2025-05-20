import Author from "./src/models/author.js";
import Book from "./src/models/book.js";
import User from "./src/models/user.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    authorCount: async () => await Author.countDocuments(),
    bookCount: async () => await Book.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        filter.author = author._id;
      }

      const books = await Book.find(filter).populate("author");
      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate("author");

      return authors.map((author) => {
        const count = books.filter(
          (book) => book.author && book.author.name === author.name
        ).length;
        return {
          name: author.name,
          born: author.born,
          bookCount: count,
          id: author._id,
        };
      });
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const count = await Book.countDocuments({ author: root._id });
      return count;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      console.log(context.currentUser);
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      try {
        let author = await Author.findOne({ name: args.author });

        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        const book = new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres,
        });

        await book.save();
        await book.populate("author");
        return book;
      } catch (error) {
        throw new GraphQLError("Author creation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) return null;

        author.born = args.setBornTo;
        await author.save();
        return author;
      } catch (error) {
        throw new GraphQLError("Author edit failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError("User creation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const JWT_SECRET = process.env.JWT_SECRET;
      const { sign } = jwt;
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: sign(userForToken, JWT_SECRET) };
    },
  },
};

export default resolvers;
