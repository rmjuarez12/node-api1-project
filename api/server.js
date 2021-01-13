// Import and setup express
const express = require("express");
const server = express();
server.use(express.json());

// Import the Users model
const User = require("./user-model");

//** Handlers for user endpoints **/

// POST - create a new user
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name === undefined || newUser.bio === undefined) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });

    return;
  }

  User.create(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    });
});

// GET - Get all users
server.get("/api/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved.",
      });
    });
});

// GET - Get user by ID
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
