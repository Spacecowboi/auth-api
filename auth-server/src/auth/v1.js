'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const foodModel = require('./models/food.js');
const clothesModel = require('./models/clothes.js');
const v1Routes = require('./routes/v1.js');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

// I think I need these? Literally too scared to delete them so just building routes for them
app.get('/food', async (req, res) => {
  const food = await foodModel.findAll();
  res.json(food);
});

app.get('/clothes', async (req, res) => {
  const clothes = await clothesModel.findAll();
  res.json(clothes);
});

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};