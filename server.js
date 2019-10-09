const express = require('express'); // set up an express app
// for checking validity of required parameter use express-validator
const expressValidator = require('express-validator');
const enrouten = require('express-enrouten'); // for easy route configuration 

// import Error classes
// NOTE: UnauthorizedError is built into express-jwt
const BadRequestError    = require('./errors/bad-request');
// let ForbiddenError     = require('./errors/forbidden');
const RouteNotFoundError = require('./errors/route-not-found.js');

// load environment variables
// require('dotenv').config();
const config = require('./config');

// connect to MongoDB
// mng.Promise = global.Promise
// mng.connect(process.env.CONNECTION);

// initialize app
const app = express();

/**
 * Preflight Middleware
 */
// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

//validator
app.use(expressValidator())

// parse JSON in the body of requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Routes
 */
app.use('/', enrouten({ directory: 'routes' }));

/**
 * Postflight Middleware
 */
// handle 404's
app.use((req, res, next) => {
  next(new RouteNotFoundError(`You have tried to access an API endpoint (${req.url}) that does not exist.`));
});

// handle errors (404 is not technically an error)
app.use((err, req, res, next) => {
  switch(err.name) {
    case 'BadRequestError':
      res.status(400).json({ name: err.name, message: err.message });
      break;
    case 'UnauthorizedError':
      res.status(401).json(err);
      break;
    case 'ForbiddenError':
      res.status(403).json({ name: err.name, message: err.message });
      break;
    case 'RouteNotFoundError':
      res.status(404).json({ name: err.name, message: err.message });
      break;
    default:
      res.status(500).json(err);
  }
});

// export for testing
module.exports = app;
