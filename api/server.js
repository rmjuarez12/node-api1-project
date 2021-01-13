//** Import necessary modules */

// Import and setup express
const express = require("express");
const server = express();
server.use(express.json());

// Import and setup CORS
const cors = require("cors");
server.use(cors());

// Import the Users model
const User = require("./user-model");

//** Handlers for user endpoints */

// POST - create a new user
server.post("/api/users", (req, res) => {
  // Get the data from the request
  const newUser = req.body;

  // If the name or bio of the data is not present, return a bad request error
  if (newUser.name === undefined || newUser.bio === undefined) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });

    return;
  }

  // Create new user
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
  // Get ID from the endpoint
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

// DELETE - Delete a user by ID
server.delete("/api/users/:id", (req, res) => {
  // Get ID from the endpoint
  const { id } = req.params;

  User.delete(id)
    .then((user) => {
      if (user) {
        res
          .status(200)
          .json({ message: `Successfully deleted user ${user.name}` });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

// PUT - Update user by ID
server.put("/api/users/:id", (req, res) => {
  // Get ID from the endpoint
  const { id } = req.params;

  // Get new data to insert
  const newData = req.body;

  // If the new data has no name or bio, return bad request error
  if (newData.name === undefined || newData.bio === undefined) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    return;
  }

  User.update(id, newData)
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
      res.status(500).json();
    });
});

//** Export the module */

module.exports = server;
