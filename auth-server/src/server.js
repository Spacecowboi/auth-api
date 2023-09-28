'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const logger = require('./auth/middleware/logger'); //moved this from api-server
const v1Routes = require('./auth/v1');
const authRoutes = require('./auth/routes.js');


// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(v1Routes); //using new routes here
app.use('/auth', authRoutes);
app.use(logger); //using it here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};