const express = require('express');

require('express-async-errors');

const app = express();

const router = express.Router();

require('dotenv').config();

const { API_PREFIX, DB_HOST } = require('config');

const mongoose = require('mongoose');

mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const cors = require('cors');

const badJsonHandler = require('./middlewares/bad-json-handler');

const urlNotFoundHandler = require('./middlewares/404-handler');

const errorHandler = require('./middlewares/error-handler');

app.use(
  cors({
    'Access-Control-Max-Age': 600,
  }),
);

app.use(express.json());

app.use(badJsonHandler);

const { routes } = require('./loader')(router);

app.use(API_PREFIX, routes);

app.use('*', urlNotFoundHandler);

app.use(errorHandler);

module.exports = app;
