/* eslint-disable no-undef */
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { makeServer } from "graphql-ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./src/models/user.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

const MONGODB_URI = process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = makeServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        const auth = ctx.extra.request?.headers?.authorization;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          try {
            const token = auth.substring(7);
            const decodedToken = jwt.verify(token, JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
          } catch (error) {
            console.log("WS JWT verification error:", error.message);
          }
        }
        return {};
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          try {
            const token = auth.substring(7);
            const decodedToken = jwt.verify(token, JWT_SECRET);

            const currentUser = await User.findById(decodedToken.id);

            return { currentUser };
          } catch (error) {
            console.log("JWT verification or user fetch error:", error.message);
          }
        }
        return {};
      },
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
  });
};

start();
