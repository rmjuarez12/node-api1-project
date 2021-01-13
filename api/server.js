// Import express
const express = require("express");
const server = express();

// Import the Users model
const User = require("./user-model");

//** Handlers for user endpoint **/

// GET all users
server.get("/api/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = server;
