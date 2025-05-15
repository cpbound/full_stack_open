import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { v1: uuidv1 } from "uuid";
import Author from "./src/models/author.js";
import Book from "./src/models/book.js";

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  },

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  },

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  },

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
    `;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let filteredBooks = books;

      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (book) => book.author === args.author
        );
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        );
      }
      return filteredBooks;
    },
    allAuthors: () => {
      return authors.map((author) => {
        const count = books.filter(
          (book) => book.author === author.name
        ).length;
        return {
          name: author.name,
          born: author.born || null,
          bookCount: count,
          id: author.id,
        };
      });
    },
  },
  Book: {
    author: (root) => {
      return root.author
    },
  },

  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      console.log(
        "Mongoose connection readyState:",
        mongoose.connection.readyState
      );

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
      console.log("📘 Book after population:", book);
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const MONGODB_URI = process.env.MONGODB_URI


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
    startStandaloneServer(server, {
      listen: { port: 4000 },
    }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
      mongoose.connection.once("open", () => {
        console.log("✅ Mongoose connection open");
      });
    });
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
