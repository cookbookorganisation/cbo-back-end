const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(express.json());

const usersRouter = require('../users/users-router.js')


server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
  res.status(200).json("Hello world!");
});

module.exports = server;
