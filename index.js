const express = require('express');
const routes = require('./routes'); // Import the routes from routes.js

const app = express();
const port = 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount the routes
app.use('/employees', routes); // Assuming you want to prefix the routes with '/employees'

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

