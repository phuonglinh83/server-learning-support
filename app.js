if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

// Core modules
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./auth');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(auth.initialize());


app.use('/users',	require('./routes/users'));
app.use('/videos',	require('./routes/videos'));
app.use('/categories',	require('./routes/categories'));
module.exports = app;
