// Import the express server
const server = require("./api/server");

// Declare the port to use
const PORT = 5000;

// Start listening to the server
server.listen(PORT, () => {
  console.log(`\n--- Listening to server on port ${PORT} ---\n`);
});
