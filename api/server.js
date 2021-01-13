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
      res
        .status(500)
        .json({
          errorMessage: "The users information could not be retrieved.",
        });
    });
});

// GET user by ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

module.exports = server;
