const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  console.log("authorization", authorization);

  if (authorization && authorization.startsWith("Bearer ")) {
    // console.log("request.token", request.token);
    request.token = authorization.replace("Bearer ", "");
  }
  // request.token = null;
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name);
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (
    error.message.includes("is shorter than the minimum allowed length")
  ) {
    return response
      .status(400)
      .json({ error: "Username is shorter than 3 characters" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
