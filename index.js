
const express = require('express');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();
const requestsRoutes = require('./routes/requests.route');
const userRoutes = require('./routes/users.route');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const db = mongoose.connection;
const port = process.env.PORT || 5000;


if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

// create a write stream (in append mode) and // setup the logger
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('combined', { stream: accessLogStream }))
app.use(logger('dev'));



// Use Api routes in the App
app.use('/api/requests', requestsRoutes);
app.use('/api/user', userRoutes);


// Connect to Mongoose and set connection variable
mongoose.Promise = global.Promise;
mongoose.connect(config.get('DB'), { useNewUrlParser: true })
  .then(() => {
    console.log(config.get('DB'));
    console.log('Database is connected ');
  }, err => {
      console.log(config.get('DB'));
      console.log('Can not connect to the database ', err);
    }
  );



// Send message for default URL
app.get('/', (req, res) => res.send('Hola from Tomas!'));


// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});



