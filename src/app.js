const express = require('express');
require('express-async-errors');
require('dotenv').config();
const { DB_HOST } = require('config');

require('mongoose').connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const app = express();

app.use(express.json());
app.use(require('./middlewares/handle-invalid-json'));
app.use('/api', require('./routes')(express.Router()));
app.use('*', require('./middlewares/handle-missing-path'));
app.use(require('./middlewares/handle-errors'));

module.exports = app;
